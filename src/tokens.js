const { Token, Lexer, CstParser, createToken } = require("chevrotain");

const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z][\w]*/,
});
const Number = createToken({ name: "Number", pattern: /(0|[1-9]\d*)/ });
const Whitespace = createToken({
  name: "Whitespace",
  pattern: /[ \t]+/,
  group: Lexer.SKIPPED,
});
const Take = createToken({
  name: "Take",
  pattern: /Take/,
  longer_alt: Identifier,
});
const From = createToken({
  name: "From",
  pattern: /from/,
  longer_alt: Identifier,
});
const Into = createToken({
  name: "Into",
  pattern: /into/,
  longer_alt: Identifier,
});
const Refrigerator = createToken({
  name: "Refrigerator",
  pattern: /refrigerator/,
  longer_alt: Identifier,
});
const Put = createToken({
  name: "Put",
  pattern: /Put/,
  longer_alt: Identifier,
});
const Mixing = createToken({
  name: "Mixing",
  pattern: /mixing/,
  longer_alt: Identifier,
});
const Bowl = createToken({
  name: "Bowl",
  pattern: /bowl/,
  longer_alt: Identifier,
});
const Ordinal = createToken({
  name: "Ordinal",
  pattern: /[1-9]\d*(st|nd|rd|th)/,
});
const Fold = createToken({
  name: "Fold",
  pattern: /Fold/,
  longer_alt: Identifier,
});
const Add = createToken({
  name: "Add",
  pattern: /Add/,
  longer_alt: Identifier,
});
const To = createToken({ name: "To", pattern: /to/, longer_alt: Identifier });
const Remove = createToken({
  name: "Remove",
  pattern: /Remove/,
  longer_alt: Identifier,
});
const Combine = createToken({
  name: "Combine",
  pattern: /Combine/,
  longer_alt: Identifier,
});
const Divide = createToken({
  name: "Divide",
  pattern: /Divide/,
  longer_alt: Identifier,
});
const Dry = createToken({
  name: "Dry",
  pattern: /dry/,
  longer_alt: Identifier,
});
const Ingredients = createToken({
  name: "Ingredients",
  pattern: /[iI]ngredients/,
  longer_alt: Identifier,
});

const Liquefy = createToken({
  name: "Liquefy",
  pattern: /(Liquefy|Liquify)/,
  longer_alt: Identifier,
});
const Contents = createToken({
  name: "Contents",
  pattern: /contents/,
  longer_alt: Identifier,
});
const Of = createToken({ name: "Of", pattern: /of/, longer_alt: Identifier });
const Stir = createToken({
  name: "Stir",
  pattern: /Stir/,
  longer_alt: Identifier,
});
const For = createToken({
  name: "For",
  pattern: /for/,
  longer_alt: Identifier,
});
const Mix = createToken({
  name: "Mix",
  pattern: /Mix/,
  longer_alt: Identifier,
});
const Well = createToken({
  name: "Well",
  pattern: /well/,
  longer_alt: Identifier,
});
const Clean = createToken({
  name: "Clean",
  pattern: /Clean/,
  longer_alt: Identifier,
});
const Pour = createToken({
  name: "Pour",
  pattern: /Pour/,
  longer_alt: Identifier,
});
const Baking = createToken({
  name: "Baking",
  pattern: /baking/,
  longer_alt: Identifier,
});
const Dish = createToken({
  name: "Dish",
  pattern: /dish/,
  longer_alt: Identifier,
});
const Until = createToken({
  name: "Until",
  pattern: /until/,
  longer_alt: Identifier,
});
const Set = createToken({
  name: "Set",
  pattern: /Set/,
  longer_alt: Identifier,
});
const Aside = createToken({
  name: "Aside",
  pattern: /aside/,
  longer_alt: Identifier,
});
const Serve = createToken({
  name: "Serve",
  pattern: /Serves?/,
  longer_alt: Identifier,
});
const With = createToken({
  name: "With",
  pattern: /with/,
  longer_alt: Identifier,
});
const Refrigerate = createToken({
  name: "Refrigerate",
  pattern: /Refrigerate/,
  longer_alt: Identifier,
});
const Period = createToken({ name: "Period", pattern: /\./ });
const BlankLine = createToken({ name: "BlankLine", pattern: /\r?\n\r?\n/ });
const DryUnits = createToken({
  name: "DryUnits",
  pattern: /(k?g|pinch(es)?)/,
  longer_alt: Identifier,
});
const SoggyUnits = createToken({
  name: "SoggyUnits",
  pattern: /(m?l|dash(es)?)/,
  longer_alt: Identifier,
});
const SussUnits = createToken({
  name: "SussUnits",
  pattern: /(cups?|teaspoons?|tablespoons?)/,
  longer_alt: Identifier,
});
const DryMeasure = createToken({
  name: "DryMeasure",
  pattern: /(heaped|level)/,
  longer_alt: Identifier,
});
const Minute = createToken({
  name: "Minute",
  pattern: /minutes?/,
  longer_alt: Identifier,
});
const Hour = createToken({
  name: "Hour",
  pattern: /hours?/,
  longer_alt: Identifier,
});
const PreHeat = createToken({
  name: "PreHeat",
  pattern: /Pre-heat/,
  longer_alt: Identifier,
});
const Oven = createToken({
  name: "Oven",
  pattern: /oven/,
  longer_alt: Identifier,
});
const Degrees = createToken({
  name: "Degrees",
  pattern: /degrees/,
  longer_alt: Identifier,
});
const Celsius = createToken({
  name: "Celsius",
  pattern: /Celsius/,
  longer_alt: Identifier,
});
const Gas = createToken({ name: "Gas", pattern: /gas/ });
const Mark = createToken({ name: "Mark", pattern: /mark/ });
const NewLine = createToken({ name: "NewLine", pattern: /\r?\n/ });
const Method = createToken({
  name: "Method",
  pattern: /Method/,
  longer_alt: Identifier,
});
const Cooking = createToken({
  name: "Cooking",
  pattern: /Cooking/,
  longer_alt: Identifier,
});
const Time = createToken({
  name: "Time",
  pattern: /time/,
  longer_alt: Identifier,
});
const Colon = createToken({ name: "Colon", pattern: /:/ });
const LBrace = createToken({ name: "LBrace", pattern: /\(/ });
const RBrace = createToken({ name: "RBrace", pattern: /\)/ });
const The = createToken({ name: "The", pattern: /the/ });
const chefLexerDefinition = [
  Whitespace,
  Take,
  From,
  Into,
  Put,
  The,
  Refrigerator,
  Mixing,
  Bowl,
  Fold,
  Add,
  To,
  Remove,
  Combine,
  Divide,
  Dry,
  Ingredients,
  Liquefy,
  Contents,
  Of,
  Stir,
  Well,
  For,
  Mix,
  Clean,
  Pour,
  Baking,
  Dish,
  Until,
  Set,
  Aside,
  Serve,
  With,
  Gas,
  Refrigerate,
  DryUnits,
  SoggyUnits,
  SussUnits,
  DryMeasure,
  Minute,
  Hour,
  PreHeat,
  Oven,
  Degrees,
  Celsius,
  Mark,
  Method,
  Cooking,
  Time,
  Identifier,
  LBrace,
  RBrace,
  Ordinal,
  Number,
  BlankLine,
  NewLine,
  Period,
  Colon,
];
const chefLexer = new Lexer(chefLexerDefinition);
class ChefParser extends CstParser {
  constructor() {
    super(chefLexerDefinition);
    const $ = this;

    $.RULE("title", () => {
      $.SUBRULE($.ingredient);
      $.CONSUME(Period);
      $.CONSUME(BlankLine);
    });

    $.RULE("specificUnit", () => {
      $.OR([
        { ALT: () => $.CONSUME(DryUnits) },
        { ALT: () => $.CONSUME(SoggyUnits) },
      ]);
    });
    $.RULE("ingredientDef", () => {
      $.OPTION(() => {
        $.CONSUME(Number);
        $.OPTION2(() => {
          $.OR([
            {
              ALT: () => {
                $.OPTION3(() => {
                  $.CONSUME(DryMeasure);
                });
                $.CONSUME(SussUnits);
              },
            },
            { ALT: () => $.SUBRULE($.specificUnit) },
          ]);
        });
      });
      $.SUBRULE($.ingredient);
    });
    $.RULE("ingredient", () => {
      $.AT_LEAST_ONE({
        DEF: () => $.CONSUME(Identifier),
      });
    });
    $.RULE("ingredientsList", () => {
      $.CONSUME(Ingredients);
      $.CONSUME(Period);
      $.CONSUME(NewLine);
      $.AT_LEAST_ONE_SEP({
        SEP: NewLine,
        DEF: () => $.SUBRULE($.ingredientDef),
      });
      $.CONSUME(BlankLine);
    });
    $.RULE("cookingTime", () => {
      $.CONSUME(Cooking);
      $.CONSUME(Time);
      $.CONSUME(Colon);
      $.CONSUME(Number);
      $.OR([{ ALT: () => $.CONSUME(Hour) }, { ALT: () => $.CONSUME(Minute) }]);
      $.CONSUME(Period);
      $.CONSUME(BlankLine);
    });
    $.RULE("temperature", () => {
      $.CONSUME(PreHeat);
      $.CONSUME(Oven);
      $.CONSUME(To);
      $.CONSUME(Number);
      $.CONSUME(Degrees);
      $.CONSUME(Celsius);
      $.OPTION(() => {
        $.CONSUME(LBrace);
        $.CONSUME(Gas);
        $.CONSUME(Mark);
        $.CONSUME2(Number);
        $.CONSUME(RBrace);
      });
      $.CONSUME(Period);
      $.CONSUME(BlankLine);
    });
    $.RULE("take", () => {
      $.CONSUME(Take);
      $.SUBRULE($.ingredient);
      $.CONSUME(From);
      $.CONSUME(Refrigerator);
      $.CONSUME(Period);
    });
    $.RULE("put", () => {
      $.CONSUME(Put);
      $.SUBRULE($.ingredient);
      $.CONSUME(Into);
      $.SUBRULE($.mixingBowl);
      $.CONSUME(Period);
    });
    $.RULE("fold", () => {
      $.CONSUME(Fold);
      $.SUBRULE($.ingredient);
      $.CONSUME(Into);
      $.SUBRULE($.mixingBowl);
      $.CONSUME(Period);
    });
    $.RULE("add", () => {
      $.CONSUME(Add);
      $.SUBRULE($.ingredient);
      $.OPTION(() => {
        $.CONSUME(To);
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(Period);
    });
    $.RULE("remove", () => {
      $.CONSUME(Remove);
      $.SUBRULE($.ingredient);
      $.OPTION(() => {
        $.CONSUME(From);
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(Period);
    });
    $.RULE("combine", () => {
      $.CONSUME(Combine);
      $.SUBRULE($.ingredient);
      $.OPTION(() => {
        $.CONSUME(Into);
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(Period);
    });
    $.RULE("divide", () => {
      $.CONSUME(Divide);
      $.SUBRULE($.ingredient);
      $.OPTION(() => {
        $.CONSUME(Into);
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(Period);
    });
    $.RULE("addDry", () => {
      $.CONSUME(Add);
      $.CONSUME(Dry);
      $.CONSUME(Ingredients);
      $.OPTION(() => {
        $.CONSUME(To);
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(Period);
    });
    $.RULE("liquefy", () => {
      $.CONSUME(Liquefy);
      $.SUBRULE($.ingredient);
      $.CONSUME(Period);
    });
    $.RULE("liquefyContents", () => {
      $.CONSUME(Liquefy);
      $.CONSUME(Contents);
      $.CONSUME(Of);
      $.SUBRULE($.mixingBowl);
      $.CONSUME(Period);
    });
    $.RULE("stir", () => {
      $.CONSUME(Stir);
      $.OPTION(() => {
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(For);
      $.CONSUME(Number);
      $.CONSUME(Minute);
      $.CONSUME(Period);
    });
    $.RULE("stirInto", () => {
      $.CONSUME(Stir);
      $.SUBRULE($.ingredient);
      $.CONSUME(Into);
      $.SUBRULE($.mixingBowl);
      $.CONSUME(Period);
    });
    $.RULE("mix", () => {
      $.CONSUME(Mix);
      $.OPTION(() => {
        $.SUBRULE($.mixingBowl);
      });
      $.CONSUME(Well);
      $.CONSUME(Period);
    });
    $.RULE("clean", () => {
      $.CONSUME(Clean);
      $.SUBRULE($.mixingBowl);
      $.CONSUME(Period);
    });
    $.RULE("pour", () => {
      $.CONSUME(Pour);
      $.CONSUME(Contents);
      $.CONSUME(Of);
      $.SUBRULE($.mixingBowl);
      $.CONSUME(Into);
      $.SUBRULE($.bakingDish);
      $.CONSUME(Period);
    });
    $.RULE("serveWith", () => {
      $.CONSUME(Serve);
      $.CONSUME(With);
      $.SUBRULE($.ingredient); // Ingredient names and titles are the same
    });
    $.RULE("beginLoop", () => {
      $.SUBRULE($.verb);
      $.CONSUME(The);
      $.SUBRULE($.ingredient);
      $.CONSUME(Period);
    });
    $.RULE("endLoop", () => {
      $.SUBRULE($.verb);
      $.CONSUME(Until);
      $.SUBRULE2($.verb);
      $.CONSUME(Period);
    });
    $.RULE("break", () => {
      $.CONSUME(Set);
      $.CONSUME(Aside);
      $.CONSUME(Period);
    });
    $.RULE("verb", () => {
      $.CONSUME(Identifier);
    });
    $.RULE("mixingBowl", () => {
      $.SUBRULE($.prefixUtensil);
      $.CONSUME(Mixing);
      $.CONSUME(Bowl);
    });
    $.RULE("bakingDish", () => {
      $.SUBRULE($.prefixUtensil);
      $.CONSUME(Baking);
      $.CONSUME(Dish);
    });
    $.RULE("prefixUtensil", () => {
      $.OR([{ ALT: () => $.CONSUME(The) }, { ALT: () => $.CONSUME(Ordinal) }]);
    });
    $.RULE("method", () => {
      $.CONSUME(Method);
      $.CONSUME(Period);
      $.CONSUME(NewLine);
      $.AT_LEAST_ONE({
        DEF: () => {
          $.OR([
            { ALT: () => $.SUBRULE($.take) },
            { ALT: () => $.SUBRULE($.put) },
            { ALT: () => $.SUBRULE($.fold) },
            { ALT: () => $.SUBRULE($.add) },
            { ALT: () => $.SUBRULE($.remove) },
            { ALT: () => $.SUBRULE($.combine) },
            { ALT: () => $.SUBRULE($.divide) },
            { ALT: () => $.SUBRULE($.addDry) },
            { ALT: () => $.SUBRULE($.liquefy) },
            { ALT: () => $.SUBRULE($.liquefyContents) },
            { ALT: () => $.SUBRULE($.stir) },
            { ALT: () => $.SUBRULE($.stirInto) },
            { ALT: () => $.SUBRULE($.mix) },
            { ALT: () => $.SUBRULE($.clean) },
            { ALT: () => $.SUBRULE($.pour) },
            { ALT: () => $.SUBRULE($.endLoop) },
            { ALT: () => $.SUBRULE($.beginLoop) },
            { ALT: () => $.SUBRULE($.break) },
          ]);
          $.OPTION(() => {
            $.CONSUME2(NewLine);
          });
        },
      });
      $.CONSUME(BlankLine);
    });
    $.RULE("serves", () => {
      $.CONSUME(Serve);
      $.CONSUME(Number);
      $.CONSUME(Period);
      $.OR([
        { ALT: () => $.CONSUME(BlankLine) },
        { ALT: () => $.CONSUME(NewLine) },
      ]);
    });
    $.RULE("function", () => {
      $.SUBRULE($.title);
      $.OPTION(() => $.SUBRULE($.ingredientsList));
      $.OPTION1(() => $.SUBRULE($.cookingTime));
      $.OPTION2(() => $.SUBRULE($.temperature));
      $.SUBRULE($.method);
      $.OPTION3(() => $.SUBRULE($.serves));
    });
    this.performSelfAnalysis();
  }
}
const instChefParser = new ChefParser();
const BaseChefVisitor = instChefParser.getBaseCstVisitorConstructor();
class ChefVisitor extends BaseChefVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }
}
function parseInput(text) {
  const lexingResult = chefLexer.tokenize(text);
  // "input" is a setter which will reset the parser's state.
  instChefParser.input = lexingResult.tokens;
  instChefParser.function();

  if (instChefParser.errors.length > 0) {
    for (var error of instChefParser.errors) {
      console.log(error);
    }
    throw new Error("sad sad panda, Parsing errors detected");
  }
}

const input = `Hello World Souffle.

Ingredients.
72 g haricot beans
101 eggs
108 g lard
111 cups oil
32 zucchinis
119 ml water
114 g red salmon
100 g dijon mustard
33 potatoes

Method.
Put potatoes into the mixing bowl. Put dijon mustard into the mixing bowl. Put lard into the mixing bowl. Put red salmon into the mixing bowl. Put oil into the mixing bowl. Put water into the mixing bowl. Put zucchinis into the mixing bowl. Put oil into the mixing bowl. Put lard into the mixing bowl. Put lard into the mixing bowl. Put eggs into the mixing bowl. Put haricot beans into the mixing bowl. Liquefy contents of the mixing bowl. Pour contents of the mixing bowl into the baking dish.

Serves 1.
`;

parseInput(input);
