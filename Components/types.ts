export interface Countries {
    name: Name
    idd: Idd
    capital: string[]
    languages: Languages
    flag: string
    population: number
    flags: string[]
}

export interface Idd {
    root: string
    suffixes: string[]
}

export interface Languages {
    ukr: string
}

export interface Name {
    common: string
    official: string
    nativeName: NativeName
}

export interface NativeName {
    ukr: Translation
}

export interface Translation {
    official: string
    common: string
}