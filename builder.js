/**
 * Promets.moi
 * Created. 2917
 *
 *
 *
 * Authors. Albert Buchard
 *
 * LICENSE MIT
 */

 /* --- Import the framwork --- */
 import {
   Object,
   Deferred,
   delay,
 } from './src/promets.moi'


/* add it to the global space in case user want to import in a script tag */
 if (typeof window !== 'undefined') {
   window.delay = delay
   window.Deferred = Deferred
 }


 export {
  Object,
  Deferred,
  delay,
}
