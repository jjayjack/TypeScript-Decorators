/*function Logger(constructor: Function) {
  console.log("logging");
  console.log(constructor);
}*/
// Convert Decorator into Decorator Factory
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    console.log("Rendering template");
    // const hookEl = document.getElementById(hookId);
    // const p = new originalConstructor();
    // if (hookEl) {
    //   hookEl.innerHTML = template;
    //   hookEl.querySelector("h1")!.textContent = p.name;
    // }
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("New Class");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}
@Logger("Logging - Default")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person object...");
  }
}
const pers = new Person();
console.log(pers);
// Property Decorator
function Log(target: any, propertyName: string | symbol) {
  console.log("Property Decorator");
  console.log(target, propertyName);
}
// Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessory Decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
// Method Decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
// Parameter Decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}
class Product {
  @Log
  title: string;
  private _price: number;
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - positive value expected");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // Triggered by the object in which it belongs / is defined
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = "This Works!";
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();
const btn = document.querySelector("button")!;
btn.addEventListener("click", p.showMessage);

// Validation with Decorators
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //[required, positive]
  };
}
function Required() {}
function PositiveNumber() {}
function validate(obj: object) {}
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;
  // Add Validation that both title & price are correct
  // Create new course
  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invalid input! Please try again..");
    return;
  }
  console.log(createdCourse);
});
