function isPrimeNumber (n, primeNumbers) {
  for (const c of primeNumbers) {
    if (n % c === 0) {
      return false
    }
    if (Math.sqrt(n) < c) {
      return true
    }
  }
  return true
}
function closurePrimeNumber () {
  const primeNumbers = [2]
  return function (n) {
    if (primeNumbers.length >= n) {
      return primeNumbers[n - 1]
    }
    let targetNumber = primeNumbers[primeNumbers.length - 1]
    while (primeNumbers.length < n) {
      targetNumber += 1
      if (isPrimeNumber(targetNumber, primeNumbers)) {
        primeNumbers.push(targetNumber)
      }
      if (primeNumbers.length >= n) {
        return targetNumber
      }
    }
  }
}

function runningTimeCalculator (targetFunction) {
  if (typeof targetFunction !== 'function') {
    throw new TypeError("Please pass type 'function' 😥")
  }
  const start = Date.now()
  const result = targetFunction()
  const end = Date.now()
  const duration = end - start
  return { start, end, result, duration }
}

function appendResult (elm, result) {
  const temp = document.createElement('li')
  temp.className = 'px-2 py-2 text-white text-center'
  temp.textContent = result
  elm.appendChild(temp)
}

const btn = document.getElementById('btn')
const input = document.getElementById('input')
const board = document.getElementById('result')
const genPrimeNumber = closurePrimeNumber()

function action () {
  const n = Number(input.value)
  if (isNaN(n)) {
    return alert('N을 입력해주세요 😊')
  }

  if (n <= 0) {
    return alert('0 이상의 자연수를 입력 해 주세요 😊')
  }

  const { result, duration } = runningTimeCalculator(() => genPrimeNumber(n))
  appendResult(board, `${n}번째 소수: ${result} (연산시간: ${duration}ms)`)
}

btn.addEventListener('click', action)
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    action()
  }
})
