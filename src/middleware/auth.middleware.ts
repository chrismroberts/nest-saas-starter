import { ForbiddenException, Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verify as jwtVerify } from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  static jwksClient: jwksRsa.JwksClient = jwksRsa({
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,      
    cache: true
  });

  async use(req: any, res: any, next: () => void) {
    if (!req.headers['authorization']) {
      throw new UnauthorizedException('Missing or invalid authentication header')
    }

    let authHeaderParts = req.headers['authorization'].split(' ')
    if (authHeaderParts.length != 2) {
      throw new UnauthorizedException('Authorization header is badly formed')
    }

    try {
      let token = authHeaderParts[1]
      let decodedUser = await this.verifyJWT(token, {
        audience: process.env.AUTH_AUDIENCE,
        issuer: `https://${process.env.AUTH_DOMAIN}/`
      })

      let name = decodedUser.sub
      let email = decodedUser.sub

      if (process.env.AUTH_TOKEN_PROFILE_PROP) {
        let embeddedProfile = decodedUser[process.env.AUTH_TOKEN_PROFILE_PROP] || { }
        name = embeddedProfile.name || decodedUser.sub
        email = embeddedProfile.email || decodedUser.sub
      }      
      
      req.userAccessToken = token
      req.user = {
        id: decodedUser.sub,
        name: name,
        email: email,
        permissions: decodedUser.permissions || [],
        token: token
      }

      next()

    } catch (error) {
      Logger.error(`Token validation failed: ${error.message}`)
      throw new UnauthorizedException()
    }
  }

  getKey(header, callback) {
    AuthMiddleware.jwksClient.getSigningKey(header.kid, function(err, key) {
        var signingKey = key?.getPublicKey()
        callback(null, signingKey)
    })
  }

  verifyJWT(token: string, options): Promise<any> {
    return new Promise((resolve, reject) => {
      jwtVerify(token, this.getKey, options, (err: any, decodedPayload: object) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(decodedPayload)
        }
      })
    })
  }
}
