import './index.css'
import '@fontsource/inter/variable.css'

import { useMagical, useExtendableEar, useConjuror, Conjuror } from './magic'

const app = useConjuror('app')

const useCount = (conjuror: Conjuror) => {
  const count = useMagical(0)
  
  const IncreaseCount = (() => {
    const div = conjuror.conjure('div')
    
    const button = div.conjure('button')
    button.accio().innerHTML = 'Increase count'

    const span = button.conjure('span')

    return { div, button, span }
  })()
  
  const DisplayCount = (() => {
    const div = conjuror.conjure('div')

    const label = div.conjure('span')
    label.accio().textContent = 'Count: '

    const display = div.conjure('span')

    return { div, label, display }
  })()
  
  count.extendEar(obliviatedState => DisplayCount.display.accio().textContent = `${obliviatedState}`)
  IncreaseCount.button.accio().addEventListener('click', () => count.obliviate(count.accio() + 1))

  return { count, IncreaseCount, DisplayCount }
}


const { count: count1, DisplayCount } = useCount(app)
const { count: count2 } = useCount(app)

useExtendableEar(
  (i, o, p) => console.log({ i, o, p }),
  count1,
  count2
)
