/**
 * Decorator for automatically unsubscribing rxjs subscriptions.
 */
export function AutoUnsubscribe(blackList = []) {
  return constructor => {
    const original = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function() {
      for (const prop in this) {
        if (prop) {
          const property = this[prop];
          if (!blackList.includes(prop)) {
            if (property && typeof property.unsubscribe === 'function') {
              property.unsubscribe();
            }
          }
        }
      }
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  };
}
