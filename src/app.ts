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
@Logger("Logging - Default")
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person object...");
  }
}
const pers = new Person();
console.log(pers);
