const { ChefParser, tokens } = require("./parser.js");
const { Lexer } = require("chevrotain");
const readline = require("readline");
const deepClone = require("clone-deep");
const parser = new ChefParser([], { outputCst: true });
const BaseCstParser = parser.getBaseCstVisitorConstructor();

class ChefInterpreter extends BaseCstParser {
  constructor() {
    super();
    this.validateVisitor();
  }
  chef(ctx, funcObj) {
    if (funcObj != null) {
      for (var i = 0; i < ctx.function.length; i++) {
        var func = ctx.function[i];
        if (this.visit(func.title) === funcObj.name) {
          return this.visit(func, {
            mixingBowls: funcObj.mixingBowl,
            bakingDishes: funcObj.bakingDishes,
            ingredients: funcObj.ingredients,
          });
        }
        throw new Error("sad sad panda, interpreting error detected");
      }
    } else {
      return this.visit(ctx.function);
    }
  }
  function(ctx, items) {
    if (items == null) {
      items = {};
    }
    const name = this.visit(ctx.title);
    var ingredients = [];
    if (ctx.ingredientList) {
      ingredients = this.visit(ctx.ingredientList);
    }
    Object.assign(items, { ingredients: ingredients });
    const methodresult = this.visit(ctx.method, items);
    var serveResult;
    if (ctx.serves) {
      serveResult = this.visit(ctx.serves, {
        bakingDishes: methodresult.bakingDishes,
      });
    }
    return {
      name: name,
      ingredients: ingredients,
      result: methodresult.result || serveResult,
    };
  }
  title(ctx) {
    var name = "";
    for (var i = 0; i < ctx.NamePart.length; i++) {
      var id = ctx.NamePart[i];
      name += id + " ";
    }
    name = name.trim();
    return name;
  }
  ingredientList(ctx) {
    return ctx.ingredient.map((ingredient) => {
      return this.visit(ingredient);
    });
  }
  ingredient(ctx) {
    var ingredientObj = { name: "", type: "unspecified", value: null };
    var name = "";
    for (var i = 0; i < ctx.Identifier.length; i++) {
      var nameSection = ctx.Identifier[i].image;
      name += nameSection + " ";
    }
    name = name.trim();
    ingredientObj.name = name;
    if (ctx.Number) {
      ingredientObj.value = Number(ctx.Number[0].image);
    }
    if (ctx.Unit) {
      switch (ctx.Unit[0].image) {
        case "g":
        case "kg":
        case "pinch":
        case "pinches":
          ingredientObj.type = "dry";
          break;
        case "ml":
        case "l":
        case "dash":
        case "dashes":
          ingredientObj.type = "liquid";
          break;
        case "cup":
        case "cups":
        case "tablespoon":
        case "tablespoons":
        case "teaspoon":
        case "teaspoons":
          ingredientObj.type = "unspecified";
          break;
      }
    }
    if (ctx.Measure) {
      switch (ctx.Measure[0].image) {
        case "heaped":
        case "level":
          ingredientObj.type = "dry";
          break;
      }
    }
    return ingredientObj;
  }
  method(ctx, items) {
    var mixingBowls = items.mixingBowls || [];
    var bakingDishes = items.bakingDishes || [];
    var ingredients = items.ingredients || [];
    var lastUsedBowl = 0;
    for (var i = 0; i < ctx.methodStatement.length; i++) {
      var statement = ctx.methodStatement[i];
      const changedItems = this.visit(statement, {
        mixingBowls: mixingBowls,
        bakingDishes: bakingDishes,
        ingredients: ingredients,
        lastUsedBowl: lastUsedBowl,
      });
      mixingBowls = changedItems.mixingBowls;
      bakingDishes = changedItems.bakingDishes;
      lastUsedBowl = changedItems.lastUsedBowl;
      if (changedItems.result) {
        if (changedItems.result !== true) console.log(changedItems.result);
        return {
          mixingBowls: mixingBowls,
          bakingDishes: changedItems.bakingDishes,
        };
      }
    }
    return { mixingBowls: mixingBowls, bakingDishes: bakingDishes };
  }
  methodStatement(ctx, items) {
    if (ctx.call) {
      return this.visit(ctx.call, items);
    }
    if (ctx.read) {
      return this.visit(ctx.read, items);
    }
    if (ctx.put) {
      return this.visit(ctx.put, items);
    }
    if (ctx.fold) {
      return this.visit(ctx.fold, items);
    }
    if (ctx.add) {
      return this.visit(ctx.add, items);
    }
    if (ctx.remove) {
      return this.visit(ctx.remove, items);
    }
    if (ctx.combine) {
      return this.visit(ctx.combine, items);
    }
    if (ctx.divide) {
      return this.visit(ctx.divide, items);
    }
    if (ctx.addDry) {
      return this.visit(ctx.addDry, items);
    }
    if (ctx.liquefy) {
      return this.visit(ctx.liquefy, items);
    }
    if (ctx.liquefyContents) {
      return this.visit(ctx.liquefyContents, items);
    }
    if (ctx.stir) {
      return this.visit(ctx.stir, items);
    }
    if (ctx.stirIngredient) {
      return this.visit(ctx.stirIngredient, items);
    }
    if (ctx.mix) {
      return this.visit(ctx.mix, items);
    }
    if (ctx.clean) {
      return this.visit(ctx.clean, items);
    }
    if (ctx.pour) {
      return this.visit(ctx.pour, items);
    }
    if (ctx.refrigerate) {
      return this.visit(ctx.refrigerate, items);
    }
    if (ctx.loop) {
      return this.visit(ctx.loop, items);
    }
    if (ctx.setAside) {
      return this.visit(ctx.setAside, items);
    }
  }
  call(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    const results = this.visit(parser.chef(), {
      name: name,
      mixingBowls: deepClone(items.mixingBowls),
      bakingDishes: deepClone(items.bakingDishes),
    });
    items.mixingBowls[0].push(...results.mixingBowls[0]);
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  read(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Awaiting a number...", (answer) => {
      if (isNaN(Number(answer))) throw new Error("you borked your inputs");
      targetIngredient.value = Number(answer);
      rl.close();
    });
    return {
      bakingDishes: items.bakingDishes,
      mixingBowls: items.mixingBowls,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  put(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      if (items.ingredients[n].name === name) {
        targetIngredient = items.ingredients[n];
        break;
      }
    }
    if (targetIngredient == null || targetIngredient.value == null) {
      throw new Error("can not put a nonexistant ingredient");
    }
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    items.mixingBowls[bowlNumber].push({
      value: targetIngredient.value,
      type: targetIngredient.type,
    });
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  fold(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    targetIngredient.type = items.mixingBowls[bowlNumber].type;
    targetIngredient.value = items.mixingBowls[bowlNumber].value;
    items.mixingBowls[bowlNumber].pop();
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  add(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    items.mixingBowls[bowlNumber].push({
      value:
        targetIngredient.value +
        items.mixingBowls[bowlNumber][items.mixingBowls[bowlNumber].length - 1],
      type: "unspecified",
    });
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  remove(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    items.mixingBowls[bowlNumber].push({
      value:
        items.mixingBowls[bowlNumber][
          items.mixingBowls[bowlNumber].length - 1
        ] - targetIngredient.value,
      type: "unspecified",
    });
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  combine(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    items.mixingBowls[bowlNumber].push({
      value:
        items.mixingBowls[bowlNumber][
          items.mixingBowls[bowlNumber].length - 1
        ] * targetIngredient.value,
      type: "unspecified",
    });
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  divide(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    items.mixingBowls[bowlNumber].push({
      value:
        items.mixingBowls[bowlNumber][
          items.mixingBowls[bowlNumber].length - 1
        ] / targetIngredient.value,
      type: "unspecified",
    });
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  addDry(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    var dryIngredients = items.ingredients.filter(
      (ingredient) =>
        ingredient.type === "dry" || ingredient.type === "unspecified"
    );

    items.mixingBowls[bowlNumber].push(dryIngredients);
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  liquefy(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  liquefyContents(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    items.mixingBowls[bowlNumber] = items.mixingBowls[bowlNumber].map(
      (ingredient) => {
        return { value: ingredient.value, type: "liquid" };
      }
    );
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  stir(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    const time = Number(ctx.Number[0].image);

    for (var i = 0; i < time && i + 1 < items.mixingBowls[bowlNumber].length; i++) {
      const tempItem = items.mixingBowls[bowlNumber][i - 1];
      items.mixingBowls[bowlNumber][i - 1] =
        items.mixingBowls[bowlNumber][i - 2];
      items.mixingBowls[bowlNumber][i - 2] = tempItem;
    }
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  stirIngredient(ctx, items) {
    var name = "";
    for (var k = 0; k < ctx.Identifier.length; k++) {
      var identifier = ctx.Identifier[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var targetIngredient;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        targetIngredient = ingredient;
        break;
      }
    }
    if (targetIngredient == null)
      throw new Error("sad sad panda, interpreting error detected");
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    const time =
      Number(targetIngredient.value) < items.mixingBowls[bowlNumber].length
        ? Number(targetIngredient.value)
        : items.mixingBowls[bowlNumber].length - 1;

    for (var i = 0; i < time && i + 1 < items.mixingBowls[bowlNumber].length; i++) {
      const tempItem = items.mixingBowls[bowlNumber][i - 1];
      items.mixingBowls[bowlNumber][i - 1] =
        items.mixingBowls[bowlNumber][i - 2];
      items.mixingBowls[bowlNumber][i - 2] = tempItem;
    }
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  mix(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    var currentIndex = items.mixingBowls[bowlNumber].length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = items.mixingBowls[bowlNumber][currentIndex];
      items.mixingBowls[bowlNumber][currentIndex] =
        items.mixingBowls[bowlNumber][randomIndex];
      items.mixingBowls[bowlNumber][randomIndex] = temporaryValue;
    }

    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  clean(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    items.mixingBowls[bowlNumber] = [];
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  pour(ctx, items) {
    var bowlNumber;
    if (ctx.mixingBowl) {
      bowlNumber = this.visit(ctx.mixingBowl, {
        lastUsedBowl: items.lastUsedBowl,
      });
      items.lastUsedBowl = bowlNumber;
    } else {
      bowlNumber = items.lastUsedBowl;
    }
    if (items.mixingBowls[bowlNumber] == null) {
      if (bowlNumber - 1 < 0 || items.mixingBowls[bowlNumber - 1] != null) {
        items.mixingBowls.push([]);
      } else {
        throw new Error("bowls declared out of order");
      }
    }
    var dishNumber;
    dishNumber = this.visit(ctx.bakingDish, { lastUsedDish: 0 });
    if (items.bakingDishes[bowlNumber] == null) {
      if (dishNumber - 1 < 0 || items.bakingDishes[dishNumber - 1] != null) {
        items.bakingDishes.push([]);
      } else {
        throw new Error("dishes declared out of order");
      }
    }
    items.bakingDishes[dishNumber].push(...items.mixingBowls[bowlNumber]);
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  loop(ctx, items) {
    const visitBegin = this.visit(ctx.beginLoop, items);
    const visitEnd = this.visit(ctx.endLoop, items);
    if (
      !(
        visitBegin.verb.toLowerCase() === visitEnd.verb.toLowerCase() ||
        visitBegin.verb.toLowerCase() + "d" === visitEnd.verb.toLowerCase() ||
        visitBegin.verb.toLowerCase() + "ed" == visitEnd.verb.toLowerCase() ||
        visitBegin.verb.toLowerCase() +
          visitBegin.verb.toLowerCase().charAt(visitBegin.verb.length - 1) +
          "ed" ===
          visitEnd.verb.toLowerCase()
      )
    ) {
      throw new Error("sad sad panda, interpreting error detected");
    }
    while (visitBegin.ingredient.value !== 0) {
      for (var i = 0; i < ctx.methodStatement.length; i++) {
        var statement = ctx.methodStatement[i];
        const changedItems = this.visit(statement, {
          mixingBowls: items.mixingBowls,
          bakingDishes: items.bakingDishes,
          ingredients: items.ingredients,
          lastUsedBowl: items.lastUsedBowl,
        });
        items.mixingBowls = changedItems.mixingBowls;
        items.bakingDishes = changedItems.bakingDishes;
        items.lastUsedBowl = changedItems.lastUsedBowl;
        if (changedItems.result) {
          return {
            result: changedItems.result,
            mixingBowls: items.mixingBowls,
            bakingDishes: changedItems.bakingDishes,
            lastUsedBowl: items.lastUsedBowl,
          };
        }
        if (changedItems.break) {
          return {
            mixingBowls: items.mixingBowls,
            bakingDishes: items.bakingDishes,
            lastUsedBowl: items.lastUsedBowl,
          };
        }
      }
      if (visitEnd.ingredient != null) {
        visitEnd.ingredient.value--;
      }
    }
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
    };
  }
  beginLoop(ctx, items) {
    const verb = ctx.verb.image;
    var name = "";
    for (var k = 0; k < ctx.zeroName.length; k++) {
      var identifier = ctx.zeroName[k];
      name += identifier.image + " ";
    }
    name = name.trim();
    var zeroIng;
    for (var n = 0; n < items.ingredients.length; n++) {
      var ingredient = items.ingredients[n];
      if (ingredient.name === name) {
        zeroIng = ingredient;
        break;
      }
    }
    if (zeroIng == null)
      throw new Error("sad sad panda, interpreting error detected");
    return { verb: verb, ingredient: zeroIng };
  }
  endLoop(ctx, items) {
    const verbed = ctx.verbed.image;
    var name = "";
    var decIng;
    if (ctx.decName) {
      for (var k = 0; k < ctx.decName.length; k++) {
        var identifier = ctx.decName[k];
        name += identifier.image + " ";
      }
      name = name.trim();
      for (var n = 0; n < items.ingredients.length; n++) {
        var ingredient = items.ingredients[n];
        if (ingredient.name === name) {
          decIng = ingredient;
          break;
        }
      }
      if (decIng == null)
        throw new Error("sad sad panda, interpreting error detected");
    }
    return { verb: verbed, ingredient: decIng };
  }
  setAside(_ctx, items) {
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
      break: true,
    };
  }
  refrigerate(ctx, items) {
    if (ctx.Number) {
      var output = "";
      for (
        var i = 0;
        i < Number(ctx.Number.image) && i < items.bakingDishes.length;
        i++
      ) {
        var dish = items.bakingDishes[i];
        dish.foreach((ing) => {
          if (ing.type !== "liquid") {
            output += ing.value;
          } else {
            output += String.fromCodePoint(ing.value);
          }
        });
      }
      return {
        mixingBowls: items.mixingBowls,
        bakingDishes: items.bakingDishes,
        lastUsedBowl: items.lastUsedBowl,
        result: output,
      };
    }
    return {
      mixingBowls: items.mixingBowls,
      bakingDishes: items.bakingDishes,
      lastUsedBowl: items.lastUsedBowl,
      result: true,
    };
  }
  serves(ctx, items) {
    var output = "";
    for (
      var i = 0;
      i < Number(ctx.Number[0].image) && i < items.bakingDishes.length;
      i++
    ) {
      items.bakingDishes[i].forEach((ing) => {
        if (ing.type !== "liquid") {
          output = ing.value + output;
        } else {
          output = String.fromCodePoint(ing.value) + output;
        }
      });
    }
    return output;
  }
  mixingBowl(ctx, items) {
    if (ctx.The || !ctx.Number) {
      return items.lastUsedBowl;
    } else {
      const number = Number(ctx.Number[0].image - 1);
      if (isNaN(number))
        throw new Error("sad sad panda, interpreting error detected");
      return number;
    }
  }
  bakingDish(ctx, items) {
    if (ctx.The || !ctx.Number) {
      return items.lastUsedDish;
    } else {
      const number = Number(ctx.Number[0].image - 1);
      if (isNaN(number))
        throw new Error("sad sad panda, interpreting error detected");
      return number;
    }
  }
  comment() {
    return;
  }
  cookingTime() {
    return;
  }
  temperature() {
    return;
  }
}
const chefLexer = new Lexer(tokens);
const parserInstance = new ChefParser([], { outputCst: true });
const interpreterInstance = new ChefInterpreter();
module.exports = {
  interpret: function (input) {
    const lexResult = chefLexer.tokenize(input);
    parserInstance.input = lexResult.tokens;
    const cst = parserInstance.chef();
    if (parserInstance.errors.length > 0) {
      throw Error(
        "Sad sad panda, parsing errors detected!\n" +
          parserInstance.errors[0].context.ruleStack +
          " " +
          parserInstance.errors[0].message
      );
    }
    const result = interpreterInstance.visit(cst);
    return result;
  },
};
