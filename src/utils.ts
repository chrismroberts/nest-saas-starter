import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

export function newId(prefix?: string) : string {
    let start = prefix ? `${prefix}_` : ``
    return `${start}${uuidv4().replace(/-/g, '')}`
}

export function epochSeconds() : number {
    return moment().unix()
}