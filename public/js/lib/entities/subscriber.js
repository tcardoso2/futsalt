/**
 * Subscriger Entity
 * Implements the Observer pattern by allowing
 * subscribers to be notified of changes
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Subscriber {
    constructor() {
        this.handlers = [] //Observers
    }

    subscribe(subscriber, obj) {
        this.handlers.push([subscriber, obj])
    }

    unsubscribe(subscriber, obj) {
        this.handlers = this.handlers.filter(
            (item) => {
                if (item !== [subscriber, obj]) return item
            }
        )
    }

    trigger(o, thisObj) {
        var scope = thisObj || window
        this.handlers.forEach(item => item[0].call(scope, o, item[1]))
    }
 }