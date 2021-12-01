import './index.css'
import '@fontsource/inter/variable.css'

import { useMagical, useExtendableEar } from './magic'

const count1 = useMagical(0 as number)
const count1Button = document.getElementById('count1-button')
const count1Display = document.getElementById('count1-display')

count1.extendEar(newMemory => count1Display.textContent = `${newMemory}`)
count1Button.addEventListener('click', () => count1.obliviate(count1.accio() + 1))

const count2 = useMagical(0 as number)
const count2Button = document.getElementById('count2-button')
const count2Display = document.getElementById('count2-display')

count2.extendEar(newMemory => count2Display.textContent = `${newMemory}`)
count2Button.addEventListener('click', () => count2.obliviate(count2.accio() + 1))

useExtendableEar(
  (i, o, p) => console.log({ i, o, p }),
  count1,
  count2
)
