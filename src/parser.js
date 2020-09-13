const {CstParser, createToken, Lexer} = require('chevrotain');


const Any = createToken({name: "Any", pattern: Lexer.NA});
const NamePart = createToken({name: "NamePart", pattern: Lexer.NA});
const AnyNotNewline = createToken({name: "AnyNotNewline", pattern: /.+/, categories: Any});
// for variable names and such
const Identifier = createToken({name: "Identifier", pattern: /[a-zA-Z]\w*/, categories: [Any, NamePart]});
const Whitespace = createToken({name: "Whitespace", pattern: /[ \t]+/, group: Lexer.SKIPPED, categories: Any})

const Number = createToken({name: "Number", pattern: /([1-9]\d*)/, categories: Any});
const OrdinalSuffix = createToken({name: "OrdinalSuffix", pattern: /(th|st|rd|nd)/, categories: Any});
const Measure = createToken({name: "Measure", pattern: /(heaped|level)/, longer_alt: Identifier, categories: [Any, NamePart]});
const Unit = createToken({name: "Unit", pattern: /(k?g|pinch(es)?|m?l|dash(es)?|cups?|teaspoons?|tablespoons?])/, longer_alt: Identifier, categories: [Any, NamePart]});

const Method = createToken({name: "Method", pattern: /Method/, longer_alt: Identifier, categories: [Any]});


const Take = createToken({ name: "Take", pattern: /Take/, longer_alt: Identifier, categories: [Any, NamePart]});
const From = createToken({ name: "From", pattern: /from/, longer_alt: Identifier, categories: [Any, NamePart]});
const Into = createToken({ name: "Into", pattern: /into/, longer_alt: Identifier, categories: [Any, NamePart]});
const Refrigerator = createToken({name: "Refrigerator", pattern: /refrigerator/, longer_alt: Identifier, categories: [Any, NamePart]});
const Put = createToken({name: "Put", pattern: /Put/, longer_alt: Identifier, categories: [Any, NamePart]})
const Mixing = createToken({name: "Mixing", pattern: /mixing/, longer_alt: Identifier, categories: [Any, NamePart]})
const Bowl = createToken({ name: "Bowl", pattern: /bowl/, longer_alt: Identifier, categories: [Any, NamePart]})
const Fold = createToken({ name: "Fold", pattern: /Fold/, longer_alt: Identifier, categories: [Any, NamePart]})
const Add = createToken({ name: "Add", pattern: /Add/, longer_alt: Identifier, categories: [Any, NamePart]})
const To = createToken({ name: "To", pattern: /to/, longer_alt: Identifier, categories: [Any, NamePart]})
const Remove = createToken({ name: "Remove", pattern: /Remove/, longer_alt: Identifier, categories: [Any, NamePart]})
const Combine = createToken({ name: "Combine", pattern: /Combine/, longer_alt:  Identifier, categories: [Any, NamePart]})
const Divide = createToken({ name: "Divide", pattern: /Divide/, longer_alt: Identifier, categories: [Any, NamePart]})
const Dry = createToken({ name: "Dry", pattern: /dry/, longer_alt: Identifier, categories: [Any, NamePart]})
const Ingredients = createToken({name: "Ingredients", pattern: /[iI]ngredients/, longer_alt: Identifier, categories: [Any]})

const Liquefy = createToken({name: "Liquefy", pattern: /(Liquefy|Liquify)/, longer_alt: Identifier, categories: [Any, NamePart]})
const Contents = createToken({ name: "Contents", pattern: /contents/, longer_alt: Identifier, categories: [Any, NamePart]})
const Of = createToken({name: "Of", pattern: /of/, longer_alt: Identifier, categories: [Any, NamePart]})
const Stir = createToken({name: "Stir", pattern: /Stir/, longer_alt: Identifier, categories: [Any, NamePart]})
const For = createToken({name: "For", pattern: /for/, longer_alt: Identifier, categories: [Any, NamePart]});
const Mix = createToken({name: "Mix", pattern: /Mix/, longer_alt: Identifier, categories: [Any, NamePart]})
const Well = createToken({name: "Well", pattern: /well/, longer_alt: Identifier, categories: [Any, NamePart]})
const Clean = createToken({name: "Clean", pattern: /Clean/, longer_alt: Identifier, categories: [Any, NamePart]})
const Pour = createToken({name: "Pour", pattern: /Pour/, longer_alt: Identifier, categories: [Any, NamePart]})
const Baking = createToken({name: "Baking", pattern: /baking/, longer_alt: Identifier, categories: [Any, NamePart]})
const Dish = createToken({name: "Dish", pattern: /dish/, longer_alt: Identifier, categories: [Any, NamePart]})
const Until = createToken({name: "Until", pattern: /until/, longer_alt: Identifier, categories: [Any, NamePart]})
const Set = createToken({name: "Set", pattern: /Set/, longer_alt: Identifier, categories: [Any, NamePart]})
const Aside = createToken({name: "Aside", pattern: /aside/, longer_alt: Identifier, categories: [Any, NamePart]})
const Serve = createToken({name: "Serve", pattern: /Serves?/, longer_alt: Identifier, categories: [Any, NamePart]})
const With = createToken({name: "With", pattern: /with/, longer_alt: Identifier, categories: [Any, NamePart]})
const Refrigerate = createToken({name: "Refrigerate", pattern: /Refrigerate/, longer_alt: Identifier, categories: [Any, NamePart]})
const Period = createToken({name: "Period", pattern: /\./, categories: [Any]})
const The = createToken({name: "The", pattern: /the/, longer_alt: Identifier, categories: [Any, NamePart]});
const Minute = createToken({name: "Minute", pattern: /minutes?/, longer_alt: Identifier, categories: [Any, NamePart]})
const Hour = createToken({name: "Hour", pattern: /hours?/, longer_alt: Identifier, categories: [Any, NamePart]})
const PreHeat = createToken({name: "PreHeat", pattern: /Pre-heat/, longer_alt: Identifier, categories: [Any]})
const Oven = createToken({name: "Oven", pattern: /oven/, longer_alt: Identifier, categories: [Any, NamePart]})
const Degrees = createToken({name: "Degrees", pattern: /degrees/, longer_alt: Identifier, categories: [Any, NamePart]})
const Celsius = createToken({name: "Celsius", pattern: /Celsius/, longer_alt: Identifier, categories: [Any, NamePart]})
const Gas = createToken({name: "Gas", pattern: /gas/, categories: [Any, NamePart]});
const Mark = createToken({name: "Mark", pattern: /mark/, categories: [Any, NamePart]});
const NewLine = createToken({name: "NewLine", pattern: /\r?\n/});
const Cooking = createToken({name: "Cooking", pattern: /Cooking/, longer_alt: Identifier, categories: [Any]});
const Time = createToken({name: "Time", pattern: /time/, longer_alt: Identifier, categories: [Any, NamePart]});
const Colon = createToken({name: "Colon", pattern: /:/, categories: Any});
const LBrace = createToken({name: "LBrace", pattern: /\(/, categories: Any});
const RBrace = createToken({name: "RBrace", pattern: /\)/, categories: Any});
const allTokens = [
  Whitespace,
  The,
  OrdinalSuffix,
  Take,
  From,
  Into,
  Put,
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
  Gas,
  Dish,
  Measure,
  Unit,
  Until,
  Set,
  Aside,
  Serve,
  With,
  Refrigerate,
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
  NamePart,
  Any,
  LBrace,
  RBrace,
  Number,
  NewLine,
  Period,
  Colon,
  AnyNotNewline
]

class ChefParser extends CstParser {
  constructor () {
    super(allTokens)
    console.log(allTokens)
    this.RULE("title", () => {
      this.AT_LEAST_ONE(() => {
        this.CONSUME(NamePart);
      })
      this.CONSUME(Period)
    })
    this.RULE("comment", () => {
      this.CONSUME(NamePart)
      this.MANY(() => {
        this.CONSUME(Any)
      })
      this.CONSUME(NewLine)
      this.CONSUME1(NewLine)
    })
    this.RULE("ingredientList", () => {
      this.CONSUME(Ingredients)
      this.CONSUME(Period)
      this.CONSUME(NewLine)
      this.AT_LEAST_ONE_SEP({
        SEP: NewLine,
        DEF: () => {
          this.SUBRULE(this.ingredient)
        }
      })
    })
    this.RULE("ingredient", () => {
      this.OPTION(() => {
        this.CONSUME(Number);
        this.OPTION1(() => {
          this.OPTION2(() => {
            this.CONSUME(Measure)
          })
          this.CONSUME(Unit)
        })
      })
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
    })
    this.RULE("cookingTime", () => {
      this.CONSUME(Cooking)
      this.CONSUME(Time)
      this.CONSUME(Colon)
      this.CONSUME(Number)
      this.OR([
        {ALT: () => this.CONSUME(Hour)},
        {ALT: () => this.CONSUME(Minute)},
      ])
      this.CONSUME(Period)
    })
    this.RULE("temperature", () => {
      this.CONSUME(PreHeat)
      this.CONSUME(Oven)
      this.CONSUME(To)
      this.CONSUME(Number)
      this.CONSUME(Degrees)
      this.CONSUME(Celsius)
      this.OPTION(() => {
        this.CONSUME(Gas)
        this.CONSUME(Mark)
        this.CONSUME1(Number)
      })
      this.CONSUME(Period)
    })
    this.RULE("method", () => {
      this.CONSUME(Method)
      this.CONSUME(Period)
      this.CONSUME(NewLine)
      this.AT_LEAST_ONE(() => {
        this.SUBRULE(this.methodStatement)
        this.OPTION(() => {
          this.CONSUME1(NewLine)
        })
      })
    })
    this.RULE("methodStatement", () => {
      this.OR([
        {ALT: () => this.SUBRULE(this.call)},
        {ALT: () => this.SUBRULE(this.read)},
        {ALT: () => this.SUBRULE(this.put)},
        {ALT: () => this.SUBRULE(this.fold)},
        {ALT: () => this.SUBRULE(this.add)},
        {ALT: () => this.SUBRULE(this.remove)},
        {ALT: () => this.SUBRULE(this.combine)},
        {ALT: () => this.SUBRULE(this.divide)},
        {ALT: () => this.SUBRULE(this.addDry)},
        {ALT: () => this.SUBRULE(this.liquefy)},
        {ALT: () => this.SUBRULE(this.liquefyContents)},
        {ALT: () => this.SUBRULE(this.stir)},
        {ALT: () => this.SUBRULE(this.stirIngredient)},
        {ALT: () => this.SUBRULE(this.mix)},
        {ALT: () => this.SUBRULE(this.clean)},
        {ALT: () => this.SUBRULE(this.pour)},
        {ALT: () => this.SUBRULE(this.refrigerate)},
        {ALT: () => this.SUBRULE(this.loop)},
        {ALT: () => this.SUBRULE(this.setAside)},
      ])
    })
    this.RULE("serves", () => {
      this.CONSUME(Serve)
      this.CONSUME(Number)
      this.CONSUME(Period)
    })
    this.RULE("call", () => {
      this.CONSUME(Serve)
      this.CONSUME(With)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(Period)
    })
    this.RULE("read", () => {
      this.CONSUME(Take)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(From)
      this.CONSUME(Refrigerator)
      this.CONSUME(Period)
    })
    this.RULE("put", () => {
      this.CONSUME(Put)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(Into)
      this.SUBRULE(this.mixingBowl)
      this.CONSUME(Period)
    })
    this.RULE("fold", () => {
      this.CONSUME(Fold)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(Into)
      this.SUBRULE(this.mixingBowl)
      this.CONSUME(Period)
    })
    this.RULE("add", () => {
      this.CONSUME(Add)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.OPTION(() => {
        this.CONSUME(Into)
        this.SUBRULE(this.mixingBowl)
      })
      this.CONSUME(Period)
    })
    this.RULE("remove", () => {
      this.CONSUME(Remove)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.OPTION(() => {
        this.CONSUME(From)
        this.SUBRULE(this.mixingBowl)
      })
      this.CONSUME(Period)
    })
    this.RULE("combine", () => {
      this.CONSUME(Combine)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.OPTION(() => {
        this.CONSUME(Into)
        this.SUBRULE(this.mixingBowl)
      })
      this.CONSUME(Period)
    })
    this.RULE("divide", () => {
      this.CONSUME(Divide)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.OPTION(() => {
        this.CONSUME(Into)
        this.SUBRULE(this.mixingBowl)
      })
      this.CONSUME(Period)
    })
    this.RULE("addDry", () => {
      this.CONSUME(Add)
      this.CONSUME(Dry)
      this.CONSUME(Ingredients)
      this.OPTION(() => {
        this.CONSUME(To)
        this.SUBRULE(this.mixingBowl)
      })
      this.CONSUME(Period)
    })
    this.RULE("liquefy", () => {
      this.CONSUME(Liquefy)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(Period)
    })
    this.RULE("liquefyContents", () => {
      this.CONSUME(Liquefy)
      this.CONSUME(Contents)
      this.CONSUME(Of)
      this.SUBRULE(this.mixingBowl)
      this.CONSUME(Period)
    })
    this.RULE("stir", () => {
      this.CONSUME(Stir)
      this.OPTION(() => this.SUBRULE(this.mixingBowl))
      this.CONSUME(For)
      this.CONSUME(Number)
      this.CONSUME(Minute)
      this.CONSUME(Period)
    })
    this.RULE("stirIngredient", () => {
      this.CONSUME(Stir)
      this.AT_LEAST_ONE(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(Into)
      this.SUBRULE(this.mixingBowl)
      this.CONSUME(Period)
    })
    this.RULE("mix", () => {
      this.CONSUME(Mix)
      this.OPTION(() => this.SUBRULE(this.mixingBowl))
      this.CONSUME(Well)
      this.CONSUME(Period)
    })
    this.RULE("clean", () => {
      this.CONSUME(Clean)
      this.SUBRULE(this.mixingBowl)
      this.CONSUME(Period)
    })
    this.RULE("pour", () => {
      this.CONSUME(Pour)
      this.CONSUME(Contents)
      this.CONSUME(Of)
      this.SUBRULE(this.mixingBowl)
      this.CONSUME(Into)
      this.SUBRULE(this.bakingDish)
      this.CONSUME(Period)
    })
    this.RULE("refrigerate", () => {
      this.CONSUME(Refrigerate)
      this.OPTION(() => {
        this.CONSUME(For)
        this.CONSUME(Number)
        this.CONSUME(Hour)
      })
      this.CONSUME(Period)
    })
    this.RULE("loop", () => {
      this.CONSUME(Identifier, {LABEL: "verb"})
      this.CONSUME(The)
      this.AT_LEAST_ONE(() => {
        this.CONSUME1(Identifier, {LABEL: "zeroName"})
      })
      this.CONSUME(Period)
      this.MANY(() => {
        this.OPTION(() => {this.CONSUME(NewLine)})
        this.OR([
          {ALT: () => this.SUBRULE(this.methodStatement)},
        ])
      })
      this.OPTION1(() => this.CONSUME1(NewLine))
      this.CONSUME2(Identifier)
      this.OPTION2(() => {
        this.CONSUME1(The)
        this.AT_LEAST_ONE2(() => {
          this.CONSUME3(Identifier, {LABEL: "decName"})
        })
      })
      this.CONSUME(Until)
      this.CONSUME4(Identifier, {LABEL: "verbed"})
      this.CONSUME1(Period)
    })
    this.RULE("setAside", () => {
      this.CONSUME(Set)
      this.CONSUME(Aside)
      this.CONSUME(Period)
    })
    this.RULE("mixingBowl", () => {
      this.OR([
        {ALT: () => {
          this.CONSUME(Number)
          this.CONSUME(OrdinalSuffix)
        }},
        {ALT: () => this.CONSUME(The)},
      ])
      this.CONSUME(Mixing)
      this.CONSUME(Bowl)
    })
    this.RULE("bakingDish", () => {
      this.OR([
        {ALT: () => {
          this.CONSUME(Number)
          this.CONSUME(OrdinalSuffix)
        }},
      ])
      this.CONSUME(Baking)
      this.CONSUME(Dish)
    })
    this.RULE("function", () => {
      this.SUBRULE(this.title)
      this.CONSUME(NewLine)
      this.CONSUME1(NewLine)
      this.OPTION4(() => {
        this.SUBRULE(this.comment)
      })
      this.OPTION(() => {
        this.SUBRULE(this.ingredientList)
        this.CONSUME2(NewLine)
        this.CONSUME3(NewLine)
      })
      this.OPTION1(() => {
        this.SUBRULE(this.cookingTime)
        this.CONSUME4(NewLine)
        this.CONSUME5(NewLine)
      })
      this.OPTION2(() => {
        this.SUBRULE(this.temperature)
        this.CONSUME6(NewLine)
        this.CONSUME7(NewLine)
      })
      this.SUBRULE(this.method)
      this.OPTION3(() => {
        this.CONSUME8(NewLine)
        this.CONSUME9(NewLine)
        this.SUBRULE(this.serves)
      })
    })
    this.RULE("chef", () => {
      this.MANY(() => {
        this.SUBRULE(this.function)
        this.CONSUME(NewLine)
        this.CONSUME1(NewLine)
      })
      this.SUBRULE1(this.function)
    })
    this.performSelfAnalysis()
  }
}
module.exports = {
  ChefParser: ChefParser,
  tokens: allTokens
}
