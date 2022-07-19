# TypeScript-Decorators

Function that is applied to something in a certain way
`@Decorator`
`@` special character that TypeScript recognizes
`Decorator` or `decorator` points at a function

## Class Decorators

Added to the class as a whole. Receive arguments such as target, or specific constructor. _Execute when class is defined not when instantiated._

## Adding multiple decorators

Execute bottom up! All decorators run when class is defined without instantiating class.

### Property Decorators

### Method Decorator

Accepts three arguments & used before method

### Parameter Decorator

(target, name of method in which parameter is used, position of this argument within method)
