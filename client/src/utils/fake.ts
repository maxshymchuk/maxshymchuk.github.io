type StringGenerator = (amount?: number) => string;
type NumberGenerator = (min?: number, max?: number) => number;
type BoolGenerator = () => boolean;

type FakeGenerators = {
    string: StringGenerator;
    number: NumberGenerator;
    bool: BoolGenerator;
};

type FakeCallback<T> = ({ string, number, bool }: FakeGenerators) => T;

type FakeOptions = {
    amount?: number;
    string?: {
        amount?: number;
        ref?: string[];
    };
    number?: {
        min?: number;
        max?: number;
    };
    bool?: {
        chance?: number;
    };
};

const DEFAULTS = {
    amount: 1,
    string: {
        amount: 1,
        ref: 'lorem ipsum dolor sit amet'.split(' '),
    },
    number: {
        min: 0,
        max: 100,
    },
    bool: {
        chance: 0.5,
    },
} satisfies FakeOptions;

function createStringGenerator(defAmount = DEFAULTS.string.amount, defRef = DEFAULTS.string.ref): StringGenerator {
    return (amount = defAmount, ref = defRef) => {
        const selected: string[] = [];
        for (let i = 0; i < amount; i++) {
            selected.push(ref[Math.round(Math.random() * (ref.length - 1))]);
        }
        return selected.join(' ');
    };
}

function createNumberGenerator(defMin = DEFAULTS.number.min, defMax = DEFAULTS.number.max): NumberGenerator {
    return (min = defMin, max = defMax) => Math.round(Math.random() * (max - min)) + min;
}

function createBoolGenerator(defChance = DEFAULTS.bool.chance): BoolGenerator {
    return (chance = defChance) => Math.random() < Math.min(1, Math.max(0, chance));
}

function fake<T>(callback: FakeCallback<T>, options?: FakeOptions): T[] {
    const { amount = DEFAULTS.amount, string, number, bool } = options ?? {};
    const generators = {
        string: createStringGenerator(string?.amount, string?.ref),
        number: createNumberGenerator(number?.min, number?.max),
        bool: createBoolGenerator(bool?.chance),
    };
    return [...Array(amount)].map(() => callback(generators));
}

export default fake;

export type { FakeGenerators, FakeCallback, FakeOptions };
