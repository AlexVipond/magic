type Magical<T extends SupportedType> = {
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
type SupportedType = string | number | boolean
type Spell<T> = (obliviatedMagical: T, previousMagical: T) => void

/**
 * Create some magical state.
 * @param initialState The initial state of the magical state.
 */
export const useMagical = <T extends SupportedType>(initial: T): Magical<T> => {
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
  spell: (indexOfObliviated: number, obliviatedMagicals: SupportedType[], previousMagicals: SupportedType[]) => void,
  ...magicals: Magical<SupportedType>[]
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
