// Typescript is truly evil
import { FastifyInstance, RouteShorthandMethod } from 'fastify';

type _Params<T> = T extends {
  (...args: infer A1): unknown;
  (...args: infer A2): unknown;
  (...args: infer A3): unknown;
  (...args: infer A4): unknown;
  (...args: infer A5): unknown;
  (...args: infer A6): unknown;
  (...args: infer A7): unknown;
  (...args: infer A8): unknown;
  (...args: infer A9): unknown;
  (...args: infer A10): unknown;
  (...args: infer A11): unknown;
  (...args: infer A12): unknown;
  (...args: infer A13): unknown;
  (...args: infer A14): unknown;
}
  ? [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14]
  : never;

type _23Params<T> = T extends {
  (...args: infer A1): unknown;
  (...args: infer A2): unknown;
  (...args: infer A3): unknown;
  (...args: infer A4): unknown;
  (...args: infer A5): unknown;
  (...args: infer A6): unknown;
  (...args: infer A7): unknown;
  (...args: infer A8): unknown;
  (...args: infer A9): unknown;
  (...args: infer A10): unknown;
  (...args: infer A11): unknown;
  (...args: infer A12): unknown;
  (...args: infer A13): unknown;
  (...args: infer A14): unknown;
  (...args: infer A15): unknown;
  (...args: infer A16): unknown;
  (...args: infer A17): unknown;
  (...args: infer A18): unknown;
  (...args: infer A19): unknown;
  (...args: infer A20): unknown;
  (...args: infer A21): unknown;
  (...args: infer A22): unknown;
  (...args: infer A23): unknown;
}
  ? [
      A1,
      A2,
      A3,
      A4,
      A5,
      A6,
      A7,
      A8,
      A9,
      A10,
      A11,
      A12,
      A13,
      A14,
      A15,
      A16,
      A17,
      A18,
      A19,
      A20,
      A21,
      A22,
      A23,
    ]
  : never;

type _1to5Params<T> = T extends {
  (...opts: infer T1): any;
  (...opts: infer T2): any;
  (...opts: infer T3): any;
  (...opts: infer T4): any;
  (...opts: infer T5): any;
}
  ? [T1, T2, T3, T4, T5]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
      (...opts: infer T3): any;
      (...opts: infer T4): any;
    }
  ? [T1, T2, T3, T4]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
      (...opts: infer T3): any;
    }
  ? [T1, T2, T3]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
    }
  ? [T1, T2]
  : T extends {
      (...opts: infer T1): any;
    }
  ? [T1]
  : never;

type _6to10Params<T> = T extends {
  (...opts: infer T1): any;
  (...opts: infer T2): any;
  (...opts: infer T3): any;
  (...opts: infer T4): any;
  (...opts: infer T5): any;
  (...opts: infer T6): any;
  (...opts: infer T7): any;
  (...opts: infer T8): any;
  (...opts: infer T9): any;
  (...opts: infer T10): any;
}
  ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
      (...opts: infer T3): any;
      (...opts: infer T4): any;
      (...opts: infer T5): any;
      (...opts: infer T6): any;
      (...opts: infer T7): any;
      (...opts: infer T8): any;
      (...opts: infer T9): any;
    }
  ? [T1, T2, T3, T4, T5, T6, T7, T8, T9]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
      (...opts: infer T3): any;
      (...opts: infer T4): any;
      (...opts: infer T5): any;
      (...opts: infer T6): any;
      (...opts: infer T7): any;
      (...opts: infer T8): any;
    }
  ? [T1, T2, T3, T4, T5, T6, T7, T8]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
      (...opts: infer T3): any;
      (...opts: infer T4): any;
      (...opts: infer T5): any;
      (...opts: infer T6): any;
      (...opts: infer T7): any;
    }
  ? [T1, T2, T3, T4, T5, T6, T7]
  : T extends {
      (...opts: infer T1): any;
      (...opts: infer T2): any;
      (...opts: infer T3): any;
      (...opts: infer T4): any;
      (...opts: infer T5): any;
      (...opts: infer T6): any;
    }
  ? [T1, T2, T3, T4, T5, T6]
  : never;

type RemoveUnknownsFromTuple<T> = T extends [infer A, ...infer Rest]
  ? unknown[] extends A
    ? RemoveUnknownsFromTuple<Rest>
    : [A, ...RemoveUnknownsFromTuple<Rest>]
  : T;

type TupleToArrayUnion<A extends readonly unknown[]> = A extends (infer T)[]
  ? T extends unknown[]
    ? T
    : []
  : [];

export type OverloadParameters<T extends Function> = TupleToArrayUnion<
  RemoveUnknownsFromTuple<_Params<T>>
>;
export type OverloadParameters23<T extends Function> = TupleToArrayUnion<
  _23Params<T>
>;
export type OverloadParameters1to5<T extends Function> = TupleToArrayUnion<
  _1to5Params<T>
>;
export type OverloadParameters6to10<T extends Function> = TupleToArrayUnion<
  _6to10Params<T>
>;

type Z = OverloadParameters6to10<FastifyInstance['addHook']>;
