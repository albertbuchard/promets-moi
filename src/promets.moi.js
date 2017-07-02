function noop() {}

let debuglog = noop()
if (typeof window !== 'undefined') {
  window.PM_DEBUG_MODE_ON = false
  debuglog = (window.PM_DEBUG_MODE_ON) ? console.log.bind(console) : noop
}


/**
 * From http://www.datchley.name/promise-patterns-anti-patterns/
 * @param  {int} ms delay in ms
 * @return {promise} promise which will resolve in delay ms
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Replace the now defunc Promise.defer()
 * @method Deferred
 */
function Deferred() {
  this.resolve = null
  this.reject = null
  this.resolved = false
  this.rejected = false
  this.pending = true
  this.status = 0
  /*
   * Create Pomise object.
   * Initially in pending state.
   */
  this.promise = new Promise((resolve, reject) => {
    this.resolve = (data) => {
      this.resolved = true
      this.pending = false
      resolve(data)
    }
    this.reject = (e) => {
      this.rejected = true
      this.pending = false
      reject(e)
    }
  })
}

/**
 * Allows to return an error for missing parameters.
 * @param  {String} param Optional string to add after the error.
 */
function mandatory(param = '') {
  throw new Error(`Missing parameter ${param}`)
}


Object.defineProperty(Object.prototype, 'observe', {
  value: function observe(attribute = mandatory(), lookForValue = true, rate = 500) {
    const deferred = new Deferred()
    debuglog('Started observing ', this, ' attribute ', attribute, ' for value ', lookForValue, ' current value ', this[attribute])
    const checkForValue = () => {
      if (this[attribute] === lookForValue) {
        debuglog('Finished observing ', this, ' attribute ', attribute, ' for value ', lookForValue, ' current value ', this[attribute])
        deferred.resolve(lookForValue)
      } else {
        debuglog('im still observing ', this, ' attribute ', attribute, ' for value ', lookForValue, ' current value ', this[attribute])
        delay(rate).then(checkForValue)
      }
    }
    checkForValue()
    return deferred.promise
  },
  enumerable: false,
})

export { Deferred, delay, debuglog, Object }
