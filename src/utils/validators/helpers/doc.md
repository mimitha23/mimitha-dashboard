> In the case to use this **Validators class** only thing you need is to create your own class
> for specific form validation and in this class you have to describe each field you want to validate.</br>
> The Goal of this Validation logic is to validate non normalised form states.</br>
> What i mean in non normalised form states is that in traditional way we have object with primitive values to validate e.g

</br>

### example:

```javascript
{
  username:"username",
  lastname:"lastname",
}
```

</br>

> It's ease to validate this kind of objects but sometimes when our aplication has more complex form states e.g

</br>

### example:

```javascript
{
  username:"username",
  lastname:"lastname",
  hobbies:["reading","walking","sleeping"],
  job:{
    location:"city",
    position:"position"
  },
  education:[
    {
      institute:"institute",
      degree:"degree",
    },
    {
      institute:"institute 2",
      degree:"degree 2",
    },
  ]
}
```

</br>

> In this case it's much harder to validate each field, especialy if we want to validate nested fields in object, or into the objects array, or into the just primitives array. Then we need to write separated logics for each. Thats why i create this Validation class. So with help of this

</br>

> EXAMPLE: lets say we have product registration form and we want to validate this form ... 🔻

- 1.0 first of all we need to import Validators class and availableValidationRules object

```javascript
import Validators from "utils/validators/Validators";
import { availableValidationRules as Rules } from "utils/validators/Validators";
```

- 2.0 then we need to create our own RegisterProductValidation class to describe fields we want to validate

```javascript
export default class RegisterProductValidation extends Validators {
  constructor() {
    // this property names in constructor:**validationToExecute** and **error** are constants
    // they are used in extended classes for utility methods so don't change them.

    super();

    /**
     During describe field validation you have to define type of field.
     There are 4 kind of types: isPrimitive; isObject, isObjectsArray; isPrimitivesArray.
     Each of them needs different kind of description to validate field correctly.
     Here are examples:
    **/
    this.validationToExecute = [
      ### 1.0) isPrimitive examples
      // **color** and **price** is primitive values here
      {
        key: "color", // key is the field name which is contained by credentials(data block we are validating)
        isPrimitive: true, //because of it's primitive value it's defined as isPrimitive to true
        rules: [
          /**
           and there are rules which we want to execute above credentials.color.
           Each validation rule after execution returns object {hasError:boolean,message:string}
          */
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "price",
        isPrimitive: true,
        rules: [Rules.notIsEmpty, Rules.isNumber],
      },

      ### 1.1) isPrimitive examples
      /**
       **gender** is object here !!!
       So why it is defined as isPrimitive to true ?!
       Because we are just interested in if object includes values or not and we are not interested
       about fields inside this object, thats why it is isPrimitive to true.
       The same happens with arrays if are just interested in if array includes value or not
       e.g **productStyles** is array and isPrimitive is defined to true
      */
      {
        key: "gender",
        isPrimitive: true,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "productTypes",
        isPrimitive: true,
        rules: [Rules.isEmptyArray],
      },

      ### 2.0) isObjectsArray examples
      /**
       **texture** is object here too !!!
       But in this case we are interested in details of properties inside this object,
       so here comes new description property **fieldsToValidate** where we are describe properties inside this object
      */
      {
        key: "texture",
        isObjectsArray: true,
        fieldsToValidate: [
          {
            field: "texture_ka",
            rules: [Rules.notIsEmpty, Rules.isGeorgianLetters],
          },
          {
            field: "texture_en",
            rules: [Rules.notIsEmpty, Rules.isLatinLetters],
          },
          {
            field: "percentage",
            rules: [Rules.notIsEmpty, Rules.hasWhiteSpaceInSequence],
          },
        ],
      },
    ];

    this.error = {
      hasError: false,
      productTypes: { hasError: false, message: "" },
      gender: { hasError: false, message: "" },
      productStyles: { hasError: false, error: "" },
      seasons: { hasError: false, error: "" },
      texture: { hasError: false, error: "", itemErrors: [] },
      warnings: { hasError: false, error: "", itemErrors: [] },
    };
  }
}
```
