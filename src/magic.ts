export type Magical<T> = {
  /**
   * Summon the up-to-date magical state.
   */
  accio: () => T,
  /**
   * Extend an extendable ear into the Magic, and you'll hear when changes happen.
   * @param spell The spell to perform when the extendable ear hears changes.
   */
  extendEar: (spell: Spell<T>) => number,
  /**
   * Perform a memory charm on your magical state. Erase the old memory, and replace it with a new one.
   * @param memory The new memory that replaces the old.
   */
  obliviate: (newMemory: T) => void,
}
export type Spell<T> = (obliviatedMagical: T, previousMagical: T) => void

/**
 * Create some magical state.
 * @param initialState The initial state of the magical state.
 */
export const useMagical = <T>(initial: T): Magical<T> => {
  // `magical` is the state. The state is magical.
  let magical: T = initial

  const accio: Magical<T>['accio'] = () => magical  
  
  const extendEar: Magical<T>['extendEar'] = (spell, options = { eagerness: 'eager' }) => {
    if (options.eagerness === 'eager') spell(magical, undefined)
    return extendableEars.push(spell)
  }
  const extendableEars: Parameters<Magical<T>['extendEar']>[0][] = []

  const obliviate: Magical<T>['obliviate'] = newMemory => {
    const previousMagical = magical
    magical = newMemory
    
    for (const ear of extendableEars) {
      ear(magical, previousMagical)
    }
  }

  return {
    accio,
    extendEar,
    obliviate,
  }
}

/**
 * Extend the same extendable ear into multiple instances of Magic.
 * @param spell A special kind of spell, performed on multiple pieces of current and previous magical state.
 */
export const useExtendableEar = (
  spell: (indexOfObliviated: number, obliviatedMagicals: any[], previousMagicals: any[]) => void,
  ...magicals: Magical<any>[]
): number => {
  for (let i = 0; i < magicals.length; i++) {
    magicals[i].extendEar((obliviatedMagical, previousMagical) => {
      if (obliviatedMagical === previousMagical) return

      spell(
        i,
        magicals.map(magical => magical.accio()),
        [
          ...magicals.slice(0, i).map(magical => magical.accio()),
          previousMagical,
          ...magicals.slice(i + 1).map(magical => magical.accio()),
        ]
      )
    })
  }

  return magicals.length
}

export type Conjuror = {
  accio: () => Element,
  conjure: (tag: string) => Conjuror,
  conjured: Conjuror[]
}

export function useConjuror (id?: string) {
  const factory = (element: Element): Conjuror => {
    const accio: Conjuror['accio'] = () => element
  
    const conjure: Conjuror['conjure'] = tag => {
      const el = document.createElement(tag)
      const c = factory(el)
      conjured.push(c)
      element.appendChild(el)
      return c
    }
  
    const conjured: Conjuror['conjured'] = []
  
    return {
      accio,
      conjure,
      conjured,
    }
  }

  return factory(document.getElementById(id))
}
