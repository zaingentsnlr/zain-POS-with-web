
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductVariant
 * 
 */
export type ProductVariant = $Result.DefaultSelection<Prisma.$ProductVariantPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model SaleItem
 * 
 */
export type SaleItem = $Result.DefaultSelection<Prisma.$SaleItemPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model InventoryMovement
 * 
 */
export type InventoryMovement = $Result.DefaultSelection<Prisma.$InventoryMovementPayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>
/**
 * Model PrinterConfig
 * 
 */
export type PrinterConfig = $Result.DefaultSelection<Prisma.$PrinterConfigPayload>
/**
 * Model SyncQueue
 * 
 */
export type SyncQueue = $Result.DefaultSelection<Prisma.$SyncQueuePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductVariants
    * const productVariants = await prisma.productVariant.findMany()
    * ```
    */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs>;

  /**
   * `prisma.saleItem`: Exposes CRUD operations for the **SaleItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SaleItems
    * const saleItems = await prisma.saleItem.findMany()
    * ```
    */
  get saleItem(): Prisma.SaleItemDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.inventoryMovement`: Exposes CRUD operations for the **InventoryMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryMovements
    * const inventoryMovements = await prisma.inventoryMovement.findMany()
    * ```
    */
  get inventoryMovement(): Prisma.InventoryMovementDelegate<ExtArgs>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs>;

  /**
   * `prisma.printerConfig`: Exposes CRUD operations for the **PrinterConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrinterConfigs
    * const printerConfigs = await prisma.printerConfig.findMany()
    * ```
    */
  get printerConfig(): Prisma.PrinterConfigDelegate<ExtArgs>;

  /**
   * `prisma.syncQueue`: Exposes CRUD operations for the **SyncQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncQueues
    * const syncQueues = await prisma.syncQueue.findMany()
    * ```
    */
  get syncQueue(): Prisma.SyncQueueDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Category: 'Category',
    Product: 'Product',
    ProductVariant: 'ProductVariant',
    Customer: 'Customer',
    Sale: 'Sale',
    SaleItem: 'SaleItem',
    AuditLog: 'AuditLog',
    InventoryMovement: 'InventoryMovement',
    Setting: 'Setting',
    PrinterConfig: 'PrinterConfig',
    SyncQueue: 'SyncQueue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "category" | "product" | "productVariant" | "customer" | "sale" | "saleItem" | "auditLog" | "inventoryMovement" | "setting" | "printerConfig" | "syncQueue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>
        fields: Prisma.ProductVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductVariant>
          }
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      SaleItem: {
        payload: Prisma.$SaleItemPayload<ExtArgs>
        fields: Prisma.SaleItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          findFirst: {
            args: Prisma.SaleItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          findMany: {
            args: Prisma.SaleItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>[]
          }
          create: {
            args: Prisma.SaleItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          createMany: {
            args: Prisma.SaleItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>[]
          }
          delete: {
            args: Prisma.SaleItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          update: {
            args: Prisma.SaleItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          deleteMany: {
            args: Prisma.SaleItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          aggregate: {
            args: Prisma.SaleItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaleItem>
          }
          groupBy: {
            args: Prisma.SaleItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleItemCountArgs<ExtArgs>
            result: $Utils.Optional<SaleItemCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      InventoryMovement: {
        payload: Prisma.$InventoryMovementPayload<ExtArgs>
        fields: Prisma.InventoryMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventoryMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventoryMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>
          }
          findFirst: {
            args: Prisma.InventoryMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventoryMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>
          }
          findMany: {
            args: Prisma.InventoryMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>[]
          }
          create: {
            args: Prisma.InventoryMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>
          }
          createMany: {
            args: Prisma.InventoryMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InventoryMovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>[]
          }
          delete: {
            args: Prisma.InventoryMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>
          }
          update: {
            args: Prisma.InventoryMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>
          }
          deleteMany: {
            args: Prisma.InventoryMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventoryMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InventoryMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryMovementPayload>
          }
          aggregate: {
            args: Prisma.InventoryMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventoryMovement>
          }
          groupBy: {
            args: Prisma.InventoryMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventoryMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventoryMovementCountArgs<ExtArgs>
            result: $Utils.Optional<InventoryMovementCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
      PrinterConfig: {
        payload: Prisma.$PrinterConfigPayload<ExtArgs>
        fields: Prisma.PrinterConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrinterConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrinterConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>
          }
          findFirst: {
            args: Prisma.PrinterConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrinterConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>
          }
          findMany: {
            args: Prisma.PrinterConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>[]
          }
          create: {
            args: Prisma.PrinterConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>
          }
          createMany: {
            args: Prisma.PrinterConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrinterConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>[]
          }
          delete: {
            args: Prisma.PrinterConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>
          }
          update: {
            args: Prisma.PrinterConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>
          }
          deleteMany: {
            args: Prisma.PrinterConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrinterConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrinterConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterConfigPayload>
          }
          aggregate: {
            args: Prisma.PrinterConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrinterConfig>
          }
          groupBy: {
            args: Prisma.PrinterConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrinterConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrinterConfigCountArgs<ExtArgs>
            result: $Utils.Optional<PrinterConfigCountAggregateOutputType> | number
          }
        }
      }
      SyncQueue: {
        payload: Prisma.$SyncQueuePayload<ExtArgs>
        fields: Prisma.SyncQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          findFirst: {
            args: Prisma.SyncQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          findMany: {
            args: Prisma.SyncQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          create: {
            args: Prisma.SyncQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          createMany: {
            args: Prisma.SyncQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          delete: {
            args: Prisma.SyncQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          update: {
            args: Prisma.SyncQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          deleteMany: {
            args: Prisma.SyncQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SyncQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          aggregate: {
            args: Prisma.SyncQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncQueue>
          }
          groupBy: {
            args: Prisma.SyncQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncQueueCountArgs<ExtArgs>
            result: $Utils.Optional<SyncQueueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sales: number
    AuditLog: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | UserCountOutputTypeCountSalesArgs
    AuditLog?: boolean | UserCountOutputTypeCountAuditLogArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variants: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
  }


  /**
   * Count Type ProductVariantCountOutputType
   */

  export type ProductVariantCountOutputType = {
    saleItems: number
    inventoryMovements: number
  }

  export type ProductVariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    saleItems?: boolean | ProductVariantCountOutputTypeCountSaleItemsArgs
    inventoryMovements?: boolean | ProductVariantCountOutputTypeCountInventoryMovementsArgs
  }

  // Custom InputTypes
  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariantCountOutputType
     */
    select?: ProductVariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountSaleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountInventoryMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryMovementWhereInput
  }


  /**
   * Count Type SaleCountOutputType
   */

  export type SaleCountOutputType = {
    items: number
  }

  export type SaleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | SaleCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleCountOutputType
     */
    select?: SaleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    maxDiscount: number | null
  }

  export type UserSumAggregateOutputType = {
    maxDiscount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    name: string | null
    role: string | null
    isActive: boolean | null
    permPrintSticker: boolean | null
    permAddItem: boolean | null
    permDeleteProduct: boolean | null
    permVoidSale: boolean | null
    permViewReports: boolean | null
    permEditSettings: boolean | null
    permManageProducts: boolean | null
    permViewSales: boolean | null
    permViewGstReports: boolean | null
    permEditSales: boolean | null
    permManageInventory: boolean | null
    permManageUsers: boolean | null
    permViewCostPrice: boolean | null
    permChangePayment: boolean | null
    permDeleteAudit: boolean | null
    permBulkUpdate: boolean | null
    permBackDateSale: boolean | null
    permViewInsights: boolean | null
    maxDiscount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    name: string | null
    role: string | null
    isActive: boolean | null
    permPrintSticker: boolean | null
    permAddItem: boolean | null
    permDeleteProduct: boolean | null
    permVoidSale: boolean | null
    permViewReports: boolean | null
    permEditSettings: boolean | null
    permManageProducts: boolean | null
    permViewSales: boolean | null
    permViewGstReports: boolean | null
    permEditSales: boolean | null
    permManageInventory: boolean | null
    permManageUsers: boolean | null
    permViewCostPrice: boolean | null
    permChangePayment: boolean | null
    permDeleteAudit: boolean | null
    permBulkUpdate: boolean | null
    permBackDateSale: boolean | null
    permViewInsights: boolean | null
    maxDiscount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    name: number
    role: number
    isActive: number
    permPrintSticker: number
    permAddItem: number
    permDeleteProduct: number
    permVoidSale: number
    permViewReports: number
    permEditSettings: number
    permManageProducts: number
    permViewSales: number
    permViewGstReports: number
    permEditSales: number
    permManageInventory: number
    permManageUsers: number
    permViewCostPrice: number
    permChangePayment: number
    permDeleteAudit: number
    permBulkUpdate: number
    permBackDateSale: number
    permViewInsights: number
    maxDiscount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    maxDiscount?: true
  }

  export type UserSumAggregateInputType = {
    maxDiscount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    permPrintSticker?: true
    permAddItem?: true
    permDeleteProduct?: true
    permVoidSale?: true
    permViewReports?: true
    permEditSettings?: true
    permManageProducts?: true
    permViewSales?: true
    permViewGstReports?: true
    permEditSales?: true
    permManageInventory?: true
    permManageUsers?: true
    permViewCostPrice?: true
    permChangePayment?: true
    permDeleteAudit?: true
    permBulkUpdate?: true
    permBackDateSale?: true
    permViewInsights?: true
    maxDiscount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    permPrintSticker?: true
    permAddItem?: true
    permDeleteProduct?: true
    permVoidSale?: true
    permViewReports?: true
    permEditSettings?: true
    permManageProducts?: true
    permViewSales?: true
    permViewGstReports?: true
    permEditSales?: true
    permManageInventory?: true
    permManageUsers?: true
    permViewCostPrice?: true
    permChangePayment?: true
    permDeleteAudit?: true
    permBulkUpdate?: true
    permBackDateSale?: true
    permViewInsights?: true
    maxDiscount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    permPrintSticker?: true
    permAddItem?: true
    permDeleteProduct?: true
    permVoidSale?: true
    permViewReports?: true
    permEditSettings?: true
    permManageProducts?: true
    permViewSales?: true
    permViewGstReports?: true
    permEditSales?: true
    permManageInventory?: true
    permManageUsers?: true
    permViewCostPrice?: true
    permChangePayment?: true
    permDeleteAudit?: true
    permBulkUpdate?: true
    permBackDateSale?: true
    permViewInsights?: true
    maxDiscount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    name: string
    role: string
    isActive: boolean
    permPrintSticker: boolean
    permAddItem: boolean
    permDeleteProduct: boolean
    permVoidSale: boolean
    permViewReports: boolean
    permEditSettings: boolean
    permManageProducts: boolean
    permViewSales: boolean
    permViewGstReports: boolean
    permEditSales: boolean
    permManageInventory: boolean
    permManageUsers: boolean
    permViewCostPrice: boolean
    permChangePayment: boolean
    permDeleteAudit: boolean
    permBulkUpdate: boolean
    permBackDateSale: boolean
    permViewInsights: boolean
    maxDiscount: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sales?: boolean | User$salesArgs<ExtArgs>
    AuditLog?: boolean | User$AuditLogArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | User$salesArgs<ExtArgs>
    AuditLog?: boolean | User$AuditLogArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
      AuditLog: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      name: string
      role: string
      isActive: boolean
      permPrintSticker: boolean
      permAddItem: boolean
      permDeleteProduct: boolean
      permVoidSale: boolean
      permViewReports: boolean
      permEditSettings: boolean
      permManageProducts: boolean
      permViewSales: boolean
      permViewGstReports: boolean
      permEditSales: boolean
      permManageInventory: boolean
      permManageUsers: boolean
      permViewCostPrice: boolean
      permChangePayment: boolean
      permDeleteAudit: boolean
      permBulkUpdate: boolean
      permBackDateSale: boolean
      permViewInsights: boolean
      maxDiscount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends User$salesArgs<ExtArgs> = {}>(args?: Subset<T, User$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany"> | Null>
    AuditLog<T extends User$AuditLogArgs<ExtArgs> = {}>(args?: Subset<T, User$AuditLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly permPrintSticker: FieldRef<"User", 'Boolean'>
    readonly permAddItem: FieldRef<"User", 'Boolean'>
    readonly permDeleteProduct: FieldRef<"User", 'Boolean'>
    readonly permVoidSale: FieldRef<"User", 'Boolean'>
    readonly permViewReports: FieldRef<"User", 'Boolean'>
    readonly permEditSettings: FieldRef<"User", 'Boolean'>
    readonly permManageProducts: FieldRef<"User", 'Boolean'>
    readonly permViewSales: FieldRef<"User", 'Boolean'>
    readonly permViewGstReports: FieldRef<"User", 'Boolean'>
    readonly permEditSales: FieldRef<"User", 'Boolean'>
    readonly permManageInventory: FieldRef<"User", 'Boolean'>
    readonly permManageUsers: FieldRef<"User", 'Boolean'>
    readonly permViewCostPrice: FieldRef<"User", 'Boolean'>
    readonly permChangePayment: FieldRef<"User", 'Boolean'>
    readonly permDeleteAudit: FieldRef<"User", 'Boolean'>
    readonly permBulkUpdate: FieldRef<"User", 'Boolean'>
    readonly permBackDateSale: FieldRef<"User", 'Boolean'>
    readonly permViewInsights: FieldRef<"User", 'Boolean'>
    readonly maxDiscount: FieldRef<"User", 'Float'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sales
   */
  export type User$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * User.AuditLog
   */
  export type User$AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    taxRate: number | null
  }

  export type ProductSumAggregateOutputType = {
    taxRate: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    categoryId: string | null
    hsn: string | null
    taxRate: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    categoryId: string | null
    hsn: string | null
    taxRate: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    categoryId: number
    hsn: number
    taxRate: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    taxRate?: true
  }

  export type ProductSumAggregateInputType = {
    taxRate?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    categoryId?: true
    hsn?: true
    taxRate?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    categoryId?: true
    hsn?: true
    taxRate?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    categoryId?: true
    hsn?: true
    taxRate?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    description: string | null
    categoryId: string
    hsn: string | null
    taxRate: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    hsn?: boolean
    taxRate?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    hsn?: boolean
    taxRate?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    categoryId?: boolean
    hsn?: boolean
    taxRate?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      variants: Prisma.$ProductVariantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      categoryId: string
      hsn: string | null
      taxRate: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly hsn: FieldRef<"Product", 'String'>
    readonly taxRate: FieldRef<"Product", 'Float'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    cursor?: ProductVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  export type ProductVariantAvgAggregateOutputType = {
    mrp: number | null
    sellingPrice: number | null
    costPrice: number | null
    stock: number | null
    minStock: number | null
  }

  export type ProductVariantSumAggregateOutputType = {
    mrp: number | null
    sellingPrice: number | null
    costPrice: number | null
    stock: number | null
    minStock: number | null
  }

  export type ProductVariantMinAggregateOutputType = {
    id: string | null
    productId: string | null
    sku: string | null
    barcode: string | null
    size: string | null
    color: string | null
    mrp: number | null
    sellingPrice: number | null
    costPrice: number | null
    stock: number | null
    minStock: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    sku: string | null
    barcode: string | null
    size: string | null
    color: string | null
    mrp: number | null
    sellingPrice: number | null
    costPrice: number | null
    stock: number | null
    minStock: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductVariantCountAggregateOutputType = {
    id: number
    productId: number
    sku: number
    barcode: number
    size: number
    color: number
    mrp: number
    sellingPrice: number
    costPrice: number
    stock: number
    minStock: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductVariantAvgAggregateInputType = {
    mrp?: true
    sellingPrice?: true
    costPrice?: true
    stock?: true
    minStock?: true
  }

  export type ProductVariantSumAggregateInputType = {
    mrp?: true
    sellingPrice?: true
    costPrice?: true
    stock?: true
    minStock?: true
  }

  export type ProductVariantMinAggregateInputType = {
    id?: true
    productId?: true
    sku?: true
    barcode?: true
    size?: true
    color?: true
    mrp?: true
    sellingPrice?: true
    costPrice?: true
    stock?: true
    minStock?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductVariantMaxAggregateInputType = {
    id?: true
    productId?: true
    sku?: true
    barcode?: true
    size?: true
    color?: true
    mrp?: true
    sellingPrice?: true
    costPrice?: true
    stock?: true
    minStock?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductVariantCountAggregateInputType = {
    id?: true
    productId?: true
    sku?: true
    barcode?: true
    size?: true
    color?: true
    mrp?: true
    sellingPrice?: true
    costPrice?: true
    stock?: true
    minStock?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductVariants
    **/
    _count?: true | ProductVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductVariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductVariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductVariantMaxAggregateInputType
  }

  export type GetProductVariantAggregateType<T extends ProductVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateProductVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>
  }




  export type ProductVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithAggregationInput | ProductVariantOrderByWithAggregationInput[]
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum
    having?: ProductVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductVariantCountAggregateInputType | true
    _avg?: ProductVariantAvgAggregateInputType
    _sum?: ProductVariantSumAggregateInputType
    _min?: ProductVariantMinAggregateInputType
    _max?: ProductVariantMaxAggregateInputType
  }

  export type ProductVariantGroupByOutputType = {
    id: string
    productId: string
    sku: string
    barcode: string
    size: string | null
    color: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock: number
    minStock: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
        }
      >
    >


  export type ProductVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    sku?: boolean
    barcode?: boolean
    size?: boolean
    color?: boolean
    mrp?: boolean
    sellingPrice?: boolean
    costPrice?: boolean
    stock?: boolean
    minStock?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    saleItems?: boolean | ProductVariant$saleItemsArgs<ExtArgs>
    inventoryMovements?: boolean | ProductVariant$inventoryMovementsArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    sku?: boolean
    barcode?: boolean
    size?: boolean
    color?: boolean
    mrp?: boolean
    sellingPrice?: boolean
    costPrice?: boolean
    stock?: boolean
    minStock?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectScalar = {
    id?: boolean
    productId?: boolean
    sku?: boolean
    barcode?: boolean
    size?: boolean
    color?: boolean
    mrp?: boolean
    sellingPrice?: boolean
    costPrice?: boolean
    stock?: boolean
    minStock?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    saleItems?: boolean | ProductVariant$saleItemsArgs<ExtArgs>
    inventoryMovements?: boolean | ProductVariant$inventoryMovementsArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductVariant"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      saleItems: Prisma.$SaleItemPayload<ExtArgs>[]
      inventoryMovements: Prisma.$InventoryMovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      sku: string
      barcode: string
      size: string | null
      color: string | null
      mrp: number
      sellingPrice: number
      costPrice: number
      stock: number
      minStock: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productVariant"]>
    composites: {}
  }

  type ProductVariantGetPayload<S extends boolean | null | undefined | ProductVariantDefaultArgs> = $Result.GetResult<Prisma.$ProductVariantPayload, S>

  type ProductVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductVariantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductVariantCountAggregateInputType | true
    }

  export interface ProductVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductVariant'], meta: { name: 'ProductVariant' } }
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     * 
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductVariantFindManyArgs>(args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     * 
     */
    create<T extends ProductVariantCreateArgs>(args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductVariantCreateManyArgs>(args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     * 
     */
    delete<T extends ProductVariantDeleteArgs>(args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductVariantUpdateArgs>(args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
    **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductVariantAggregateArgs>(args: Subset<T, ProductVariantAggregateArgs>): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs['orderBy'] }
        : { orderBy?: ProductVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductVariant model
   */
  readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    saleItems<T extends ProductVariant$saleItemsArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$saleItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany"> | Null>
    inventoryMovements<T extends ProductVariant$inventoryMovementsArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$inventoryMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductVariant model
   */ 
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", 'String'>
    readonly productId: FieldRef<"ProductVariant", 'String'>
    readonly sku: FieldRef<"ProductVariant", 'String'>
    readonly barcode: FieldRef<"ProductVariant", 'String'>
    readonly size: FieldRef<"ProductVariant", 'String'>
    readonly color: FieldRef<"ProductVariant", 'String'>
    readonly mrp: FieldRef<"ProductVariant", 'Float'>
    readonly sellingPrice: FieldRef<"ProductVariant", 'Float'>
    readonly costPrice: FieldRef<"ProductVariant", 'Float'>
    readonly stock: FieldRef<"ProductVariant", 'Int'>
    readonly minStock: FieldRef<"ProductVariant", 'Int'>
    readonly isActive: FieldRef<"ProductVariant", 'Boolean'>
    readonly createdAt: FieldRef<"ProductVariant", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductVariant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
  }

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
  }

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
  }

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
  }

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput
  }

  /**
   * ProductVariant.saleItems
   */
  export type ProductVariant$saleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    cursor?: SaleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * ProductVariant.inventoryMovements
   */
  export type ProductVariant$inventoryMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    where?: InventoryMovementWhereInput
    orderBy?: InventoryMovementOrderByWithRelationInput | InventoryMovementOrderByWithRelationInput[]
    cursor?: InventoryMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryMovementScalarFieldEnum | InventoryMovementScalarFieldEnum[]
  }

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    gstin: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    gstin: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    address: number
    gstin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    gstin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    gstin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    gstin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    phone: string | null
    email: string | null
    address: string | null
    gstin: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    gstin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    gstin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    gstin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string | null
      email: string | null
      address: string | null
      gstin: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly gstin: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    billNo: number | null
    subtotal: number | null
    discount: number | null
    discountPercent: number | null
    taxAmount: number | null
    cgst: number | null
    sgst: number | null
    grandTotal: number | null
    paidAmount: number | null
    changeAmount: number | null
  }

  export type SaleSumAggregateOutputType = {
    billNo: number | null
    subtotal: number | null
    discount: number | null
    discountPercent: number | null
    taxAmount: number | null
    cgst: number | null
    sgst: number | null
    grandTotal: number | null
    paidAmount: number | null
    changeAmount: number | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    billNo: number | null
    userId: string | null
    customerName: string | null
    customerPhone: string | null
    subtotal: number | null
    discount: number | null
    discountPercent: number | null
    taxAmount: number | null
    cgst: number | null
    sgst: number | null
    grandTotal: number | null
    paymentMethod: string | null
    paidAmount: number | null
    changeAmount: number | null
    status: string | null
    remarks: string | null
    isHistorical: boolean | null
    importedFrom: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    billNo: number | null
    userId: string | null
    customerName: string | null
    customerPhone: string | null
    subtotal: number | null
    discount: number | null
    discountPercent: number | null
    taxAmount: number | null
    cgst: number | null
    sgst: number | null
    grandTotal: number | null
    paymentMethod: string | null
    paidAmount: number | null
    changeAmount: number | null
    status: string | null
    remarks: string | null
    isHistorical: boolean | null
    importedFrom: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    billNo: number
    userId: number
    customerName: number
    customerPhone: number
    subtotal: number
    discount: number
    discountPercent: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod: number
    paidAmount: number
    changeAmount: number
    status: number
    remarks: number
    isHistorical: number
    importedFrom: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    billNo?: true
    subtotal?: true
    discount?: true
    discountPercent?: true
    taxAmount?: true
    cgst?: true
    sgst?: true
    grandTotal?: true
    paidAmount?: true
    changeAmount?: true
  }

  export type SaleSumAggregateInputType = {
    billNo?: true
    subtotal?: true
    discount?: true
    discountPercent?: true
    taxAmount?: true
    cgst?: true
    sgst?: true
    grandTotal?: true
    paidAmount?: true
    changeAmount?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    billNo?: true
    userId?: true
    customerName?: true
    customerPhone?: true
    subtotal?: true
    discount?: true
    discountPercent?: true
    taxAmount?: true
    cgst?: true
    sgst?: true
    grandTotal?: true
    paymentMethod?: true
    paidAmount?: true
    changeAmount?: true
    status?: true
    remarks?: true
    isHistorical?: true
    importedFrom?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    billNo?: true
    userId?: true
    customerName?: true
    customerPhone?: true
    subtotal?: true
    discount?: true
    discountPercent?: true
    taxAmount?: true
    cgst?: true
    sgst?: true
    grandTotal?: true
    paymentMethod?: true
    paidAmount?: true
    changeAmount?: true
    status?: true
    remarks?: true
    isHistorical?: true
    importedFrom?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    billNo?: true
    userId?: true
    customerName?: true
    customerPhone?: true
    subtotal?: true
    discount?: true
    discountPercent?: true
    taxAmount?: true
    cgst?: true
    sgst?: true
    grandTotal?: true
    paymentMethod?: true
    paidAmount?: true
    changeAmount?: true
    status?: true
    remarks?: true
    isHistorical?: true
    importedFrom?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    billNo: number
    userId: string
    customerName: string | null
    customerPhone: string | null
    subtotal: number
    discount: number
    discountPercent: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod: string
    paidAmount: number
    changeAmount: number
    status: string
    remarks: string | null
    isHistorical: boolean
    importedFrom: string | null
    createdAt: Date
    updatedAt: Date
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNo?: boolean
    userId?: boolean
    customerName?: boolean
    customerPhone?: boolean
    subtotal?: boolean
    discount?: boolean
    discountPercent?: boolean
    taxAmount?: boolean
    cgst?: boolean
    sgst?: boolean
    grandTotal?: boolean
    paymentMethod?: boolean
    paidAmount?: boolean
    changeAmount?: boolean
    status?: boolean
    remarks?: boolean
    isHistorical?: boolean
    importedFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Sale$itemsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNo?: boolean
    userId?: boolean
    customerName?: boolean
    customerPhone?: boolean
    subtotal?: boolean
    discount?: boolean
    discountPercent?: boolean
    taxAmount?: boolean
    cgst?: boolean
    sgst?: boolean
    grandTotal?: boolean
    paymentMethod?: boolean
    paidAmount?: boolean
    changeAmount?: boolean
    status?: boolean
    remarks?: boolean
    isHistorical?: boolean
    importedFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    id?: boolean
    billNo?: boolean
    userId?: boolean
    customerName?: boolean
    customerPhone?: boolean
    subtotal?: boolean
    discount?: boolean
    discountPercent?: boolean
    taxAmount?: boolean
    cgst?: boolean
    sgst?: boolean
    grandTotal?: boolean
    paymentMethod?: boolean
    paidAmount?: boolean
    changeAmount?: boolean
    status?: boolean
    remarks?: boolean
    isHistorical?: boolean
    importedFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Sale$itemsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$SaleItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      billNo: number
      userId: string
      customerName: string | null
      customerPhone: string | null
      subtotal: number
      discount: number
      discountPercent: number
      taxAmount: number
      cgst: number
      sgst: number
      grandTotal: number
      paymentMethod: string
      paidAmount: number
      changeAmount: number
      status: string
      remarks: string | null
      isHistorical: boolean
      importedFrom: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Sale$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Sale$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */ 
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly billNo: FieldRef<"Sale", 'Int'>
    readonly userId: FieldRef<"Sale", 'String'>
    readonly customerName: FieldRef<"Sale", 'String'>
    readonly customerPhone: FieldRef<"Sale", 'String'>
    readonly subtotal: FieldRef<"Sale", 'Float'>
    readonly discount: FieldRef<"Sale", 'Float'>
    readonly discountPercent: FieldRef<"Sale", 'Float'>
    readonly taxAmount: FieldRef<"Sale", 'Float'>
    readonly cgst: FieldRef<"Sale", 'Float'>
    readonly sgst: FieldRef<"Sale", 'Float'>
    readonly grandTotal: FieldRef<"Sale", 'Float'>
    readonly paymentMethod: FieldRef<"Sale", 'String'>
    readonly paidAmount: FieldRef<"Sale", 'Float'>
    readonly changeAmount: FieldRef<"Sale", 'Float'>
    readonly status: FieldRef<"Sale", 'String'>
    readonly remarks: FieldRef<"Sale", 'String'>
    readonly isHistorical: FieldRef<"Sale", 'Boolean'>
    readonly importedFrom: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
    readonly updatedAt: FieldRef<"Sale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
  }

  /**
   * Sale.items
   */
  export type Sale$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    cursor?: SaleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model SaleItem
   */

  export type AggregateSaleItem = {
    _count: SaleItemCountAggregateOutputType | null
    _avg: SaleItemAvgAggregateOutputType | null
    _sum: SaleItemSumAggregateOutputType | null
    _min: SaleItemMinAggregateOutputType | null
    _max: SaleItemMaxAggregateOutputType | null
  }

  export type SaleItemAvgAggregateOutputType = {
    quantity: number | null
    mrp: number | null
    sellingPrice: number | null
    discount: number | null
    taxRate: number | null
    taxAmount: number | null
    total: number | null
  }

  export type SaleItemSumAggregateOutputType = {
    quantity: number | null
    mrp: number | null
    sellingPrice: number | null
    discount: number | null
    taxRate: number | null
    taxAmount: number | null
    total: number | null
  }

  export type SaleItemMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    variantId: string | null
    productName: string | null
    variantInfo: string | null
    quantity: number | null
    mrp: number | null
    sellingPrice: number | null
    discount: number | null
    taxRate: number | null
    taxAmount: number | null
    total: number | null
    createdAt: Date | null
  }

  export type SaleItemMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    variantId: string | null
    productName: string | null
    variantInfo: string | null
    quantity: number | null
    mrp: number | null
    sellingPrice: number | null
    discount: number | null
    taxRate: number | null
    taxAmount: number | null
    total: number | null
    createdAt: Date | null
  }

  export type SaleItemCountAggregateOutputType = {
    id: number
    saleId: number
    variantId: number
    productName: number
    variantInfo: number
    quantity: number
    mrp: number
    sellingPrice: number
    discount: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt: number
    _all: number
  }


  export type SaleItemAvgAggregateInputType = {
    quantity?: true
    mrp?: true
    sellingPrice?: true
    discount?: true
    taxRate?: true
    taxAmount?: true
    total?: true
  }

  export type SaleItemSumAggregateInputType = {
    quantity?: true
    mrp?: true
    sellingPrice?: true
    discount?: true
    taxRate?: true
    taxAmount?: true
    total?: true
  }

  export type SaleItemMinAggregateInputType = {
    id?: true
    saleId?: true
    variantId?: true
    productName?: true
    variantInfo?: true
    quantity?: true
    mrp?: true
    sellingPrice?: true
    discount?: true
    taxRate?: true
    taxAmount?: true
    total?: true
    createdAt?: true
  }

  export type SaleItemMaxAggregateInputType = {
    id?: true
    saleId?: true
    variantId?: true
    productName?: true
    variantInfo?: true
    quantity?: true
    mrp?: true
    sellingPrice?: true
    discount?: true
    taxRate?: true
    taxAmount?: true
    total?: true
    createdAt?: true
  }

  export type SaleItemCountAggregateInputType = {
    id?: true
    saleId?: true
    variantId?: true
    productName?: true
    variantInfo?: true
    quantity?: true
    mrp?: true
    sellingPrice?: true
    discount?: true
    taxRate?: true
    taxAmount?: true
    total?: true
    createdAt?: true
    _all?: true
  }

  export type SaleItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleItem to aggregate.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SaleItems
    **/
    _count?: true | SaleItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleItemMaxAggregateInputType
  }

  export type GetSaleItemAggregateType<T extends SaleItemAggregateArgs> = {
        [P in keyof T & keyof AggregateSaleItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaleItem[P]>
      : GetScalarType<T[P], AggregateSaleItem[P]>
  }




  export type SaleItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithAggregationInput | SaleItemOrderByWithAggregationInput[]
    by: SaleItemScalarFieldEnum[] | SaleItemScalarFieldEnum
    having?: SaleItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleItemCountAggregateInputType | true
    _avg?: SaleItemAvgAggregateInputType
    _sum?: SaleItemSumAggregateInputType
    _min?: SaleItemMinAggregateInputType
    _max?: SaleItemMaxAggregateInputType
  }

  export type SaleItemGroupByOutputType = {
    id: string
    saleId: string
    variantId: string
    productName: string
    variantInfo: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt: Date
    _count: SaleItemCountAggregateOutputType | null
    _avg: SaleItemAvgAggregateOutputType | null
    _sum: SaleItemSumAggregateOutputType | null
    _min: SaleItemMinAggregateOutputType | null
    _max: SaleItemMaxAggregateOutputType | null
  }

  type GetSaleItemGroupByPayload<T extends SaleItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleItemGroupByOutputType[P]>
            : GetScalarType<T[P], SaleItemGroupByOutputType[P]>
        }
      >
    >


  export type SaleItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    variantId?: boolean
    productName?: boolean
    variantInfo?: boolean
    quantity?: boolean
    mrp?: boolean
    sellingPrice?: boolean
    discount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    total?: boolean
    createdAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saleItem"]>

  export type SaleItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    variantId?: boolean
    productName?: boolean
    variantInfo?: boolean
    quantity?: boolean
    mrp?: boolean
    sellingPrice?: boolean
    discount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    total?: boolean
    createdAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saleItem"]>

  export type SaleItemSelectScalar = {
    id?: boolean
    saleId?: boolean
    variantId?: boolean
    productName?: boolean
    variantInfo?: boolean
    quantity?: boolean
    mrp?: boolean
    sellingPrice?: boolean
    discount?: boolean
    taxRate?: boolean
    taxAmount?: boolean
    total?: boolean
    createdAt?: boolean
  }

  export type SaleItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }
  export type SaleItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }

  export type $SaleItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SaleItem"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
      variant: Prisma.$ProductVariantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      variantId: string
      productName: string
      variantInfo: string | null
      quantity: number
      mrp: number
      sellingPrice: number
      discount: number
      taxRate: number
      taxAmount: number
      total: number
      createdAt: Date
    }, ExtArgs["result"]["saleItem"]>
    composites: {}
  }

  type SaleItemGetPayload<S extends boolean | null | undefined | SaleItemDefaultArgs> = $Result.GetResult<Prisma.$SaleItemPayload, S>

  type SaleItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SaleItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SaleItemCountAggregateInputType | true
    }

  export interface SaleItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SaleItem'], meta: { name: 'SaleItem' } }
    /**
     * Find zero or one SaleItem that matches the filter.
     * @param {SaleItemFindUniqueArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleItemFindUniqueArgs>(args: SelectSubset<T, SaleItemFindUniqueArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SaleItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SaleItemFindUniqueOrThrowArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleItemFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SaleItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindFirstArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleItemFindFirstArgs>(args?: SelectSubset<T, SaleItemFindFirstArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SaleItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindFirstOrThrowArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleItemFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SaleItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleItems
     * const saleItems = await prisma.saleItem.findMany()
     * 
     * // Get first 10 SaleItems
     * const saleItems = await prisma.saleItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleItemWithIdOnly = await prisma.saleItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleItemFindManyArgs>(args?: SelectSubset<T, SaleItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SaleItem.
     * @param {SaleItemCreateArgs} args - Arguments to create a SaleItem.
     * @example
     * // Create one SaleItem
     * const SaleItem = await prisma.saleItem.create({
     *   data: {
     *     // ... data to create a SaleItem
     *   }
     * })
     * 
     */
    create<T extends SaleItemCreateArgs>(args: SelectSubset<T, SaleItemCreateArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SaleItems.
     * @param {SaleItemCreateManyArgs} args - Arguments to create many SaleItems.
     * @example
     * // Create many SaleItems
     * const saleItem = await prisma.saleItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleItemCreateManyArgs>(args?: SelectSubset<T, SaleItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SaleItems and returns the data saved in the database.
     * @param {SaleItemCreateManyAndReturnArgs} args - Arguments to create many SaleItems.
     * @example
     * // Create many SaleItems
     * const saleItem = await prisma.saleItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SaleItems and only return the `id`
     * const saleItemWithIdOnly = await prisma.saleItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleItemCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SaleItem.
     * @param {SaleItemDeleteArgs} args - Arguments to delete one SaleItem.
     * @example
     * // Delete one SaleItem
     * const SaleItem = await prisma.saleItem.delete({
     *   where: {
     *     // ... filter to delete one SaleItem
     *   }
     * })
     * 
     */
    delete<T extends SaleItemDeleteArgs>(args: SelectSubset<T, SaleItemDeleteArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SaleItem.
     * @param {SaleItemUpdateArgs} args - Arguments to update one SaleItem.
     * @example
     * // Update one SaleItem
     * const saleItem = await prisma.saleItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleItemUpdateArgs>(args: SelectSubset<T, SaleItemUpdateArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SaleItems.
     * @param {SaleItemDeleteManyArgs} args - Arguments to filter SaleItems to delete.
     * @example
     * // Delete a few SaleItems
     * const { count } = await prisma.saleItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleItemDeleteManyArgs>(args?: SelectSubset<T, SaleItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleItems
     * const saleItem = await prisma.saleItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleItemUpdateManyArgs>(args: SelectSubset<T, SaleItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SaleItem.
     * @param {SaleItemUpsertArgs} args - Arguments to update or create a SaleItem.
     * @example
     * // Update or create a SaleItem
     * const saleItem = await prisma.saleItem.upsert({
     *   create: {
     *     // ... data to create a SaleItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleItem we want to update
     *   }
     * })
     */
    upsert<T extends SaleItemUpsertArgs>(args: SelectSubset<T, SaleItemUpsertArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SaleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemCountArgs} args - Arguments to filter SaleItems to count.
     * @example
     * // Count the number of SaleItems
     * const count = await prisma.saleItem.count({
     *   where: {
     *     // ... the filter for the SaleItems we want to count
     *   }
     * })
    **/
    count<T extends SaleItemCountArgs>(
      args?: Subset<T, SaleItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SaleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleItemAggregateArgs>(args: Subset<T, SaleItemAggregateArgs>): Prisma.PrismaPromise<GetSaleItemAggregateType<T>>

    /**
     * Group by SaleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleItemGroupByArgs['orderBy'] }
        : { orderBy?: SaleItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SaleItem model
   */
  readonly fields: SaleItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SaleItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    variant<T extends ProductVariantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariantDefaultArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SaleItem model
   */ 
  interface SaleItemFieldRefs {
    readonly id: FieldRef<"SaleItem", 'String'>
    readonly saleId: FieldRef<"SaleItem", 'String'>
    readonly variantId: FieldRef<"SaleItem", 'String'>
    readonly productName: FieldRef<"SaleItem", 'String'>
    readonly variantInfo: FieldRef<"SaleItem", 'String'>
    readonly quantity: FieldRef<"SaleItem", 'Int'>
    readonly mrp: FieldRef<"SaleItem", 'Float'>
    readonly sellingPrice: FieldRef<"SaleItem", 'Float'>
    readonly discount: FieldRef<"SaleItem", 'Float'>
    readonly taxRate: FieldRef<"SaleItem", 'Float'>
    readonly taxAmount: FieldRef<"SaleItem", 'Float'>
    readonly total: FieldRef<"SaleItem", 'Float'>
    readonly createdAt: FieldRef<"SaleItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SaleItem findUnique
   */
  export type SaleItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem findUniqueOrThrow
   */
  export type SaleItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem findFirst
   */
  export type SaleItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleItems.
     */
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem findFirstOrThrow
   */
  export type SaleItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleItems.
     */
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem findMany
   */
  export type SaleItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItems to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem create
   */
  export type SaleItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The data needed to create a SaleItem.
     */
    data: XOR<SaleItemCreateInput, SaleItemUncheckedCreateInput>
  }

  /**
   * SaleItem createMany
   */
  export type SaleItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleItems.
     */
    data: SaleItemCreateManyInput | SaleItemCreateManyInput[]
  }

  /**
   * SaleItem createManyAndReturn
   */
  export type SaleItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SaleItems.
     */
    data: SaleItemCreateManyInput | SaleItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SaleItem update
   */
  export type SaleItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The data needed to update a SaleItem.
     */
    data: XOR<SaleItemUpdateInput, SaleItemUncheckedUpdateInput>
    /**
     * Choose, which SaleItem to update.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem updateMany
   */
  export type SaleItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleItems.
     */
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyInput>
    /**
     * Filter which SaleItems to update
     */
    where?: SaleItemWhereInput
  }

  /**
   * SaleItem upsert
   */
  export type SaleItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The filter to search for the SaleItem to update in case it exists.
     */
    where: SaleItemWhereUniqueInput
    /**
     * In case the SaleItem found by the `where` argument doesn't exist, create a new SaleItem with this data.
     */
    create: XOR<SaleItemCreateInput, SaleItemUncheckedCreateInput>
    /**
     * In case the SaleItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleItemUpdateInput, SaleItemUncheckedUpdateInput>
  }

  /**
   * SaleItem delete
   */
  export type SaleItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter which SaleItem to delete.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem deleteMany
   */
  export type SaleItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleItems to delete
     */
    where?: SaleItemWhereInput
  }

  /**
   * SaleItem without action
   */
  export type SaleItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    details: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    details: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    details: number
    userId: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    details?: true
    userId?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    details?: true
    userId?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    details?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    details: string
    userId: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      details: string
      userId: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model InventoryMovement
   */

  export type AggregateInventoryMovement = {
    _count: InventoryMovementCountAggregateOutputType | null
    _avg: InventoryMovementAvgAggregateOutputType | null
    _sum: InventoryMovementSumAggregateOutputType | null
    _min: InventoryMovementMinAggregateOutputType | null
    _max: InventoryMovementMaxAggregateOutputType | null
  }

  export type InventoryMovementAvgAggregateOutputType = {
    quantity: number | null
  }

  export type InventoryMovementSumAggregateOutputType = {
    quantity: number | null
  }

  export type InventoryMovementMinAggregateOutputType = {
    id: string | null
    variantId: string | null
    type: string | null
    quantity: number | null
    reason: string | null
    reference: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type InventoryMovementMaxAggregateOutputType = {
    id: string | null
    variantId: string | null
    type: string | null
    quantity: number | null
    reason: string | null
    reference: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type InventoryMovementCountAggregateOutputType = {
    id: number
    variantId: number
    type: number
    quantity: number
    reason: number
    reference: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type InventoryMovementAvgAggregateInputType = {
    quantity?: true
  }

  export type InventoryMovementSumAggregateInputType = {
    quantity?: true
  }

  export type InventoryMovementMinAggregateInputType = {
    id?: true
    variantId?: true
    type?: true
    quantity?: true
    reason?: true
    reference?: true
    createdBy?: true
    createdAt?: true
  }

  export type InventoryMovementMaxAggregateInputType = {
    id?: true
    variantId?: true
    type?: true
    quantity?: true
    reason?: true
    reference?: true
    createdBy?: true
    createdAt?: true
  }

  export type InventoryMovementCountAggregateInputType = {
    id?: true
    variantId?: true
    type?: true
    quantity?: true
    reason?: true
    reference?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type InventoryMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryMovement to aggregate.
     */
    where?: InventoryMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryMovements to fetch.
     */
    orderBy?: InventoryMovementOrderByWithRelationInput | InventoryMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryMovements
    **/
    _count?: true | InventoryMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventoryMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryMovementMaxAggregateInputType
  }

  export type GetInventoryMovementAggregateType<T extends InventoryMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryMovement[P]>
      : GetScalarType<T[P], AggregateInventoryMovement[P]>
  }




  export type InventoryMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryMovementWhereInput
    orderBy?: InventoryMovementOrderByWithAggregationInput | InventoryMovementOrderByWithAggregationInput[]
    by: InventoryMovementScalarFieldEnum[] | InventoryMovementScalarFieldEnum
    having?: InventoryMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryMovementCountAggregateInputType | true
    _avg?: InventoryMovementAvgAggregateInputType
    _sum?: InventoryMovementSumAggregateInputType
    _min?: InventoryMovementMinAggregateInputType
    _max?: InventoryMovementMaxAggregateInputType
  }

  export type InventoryMovementGroupByOutputType = {
    id: string
    variantId: string
    type: string
    quantity: number
    reason: string | null
    reference: string | null
    createdBy: string
    createdAt: Date
    _count: InventoryMovementCountAggregateOutputType | null
    _avg: InventoryMovementAvgAggregateOutputType | null
    _sum: InventoryMovementSumAggregateOutputType | null
    _min: InventoryMovementMinAggregateOutputType | null
    _max: InventoryMovementMaxAggregateOutputType | null
  }

  type GetInventoryMovementGroupByPayload<T extends InventoryMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventoryMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryMovementGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryMovementGroupByOutputType[P]>
        }
      >
    >


  export type InventoryMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variantId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    reference?: boolean
    createdBy?: boolean
    createdAt?: boolean
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryMovement"]>

  export type InventoryMovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variantId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    reference?: boolean
    createdBy?: boolean
    createdAt?: boolean
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryMovement"]>

  export type InventoryMovementSelectScalar = {
    id?: boolean
    variantId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    reference?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type InventoryMovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }
  export type InventoryMovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }

  export type $InventoryMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InventoryMovement"
    objects: {
      variant: Prisma.$ProductVariantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      variantId: string
      type: string
      quantity: number
      reason: string | null
      reference: string | null
      createdBy: string
      createdAt: Date
    }, ExtArgs["result"]["inventoryMovement"]>
    composites: {}
  }

  type InventoryMovementGetPayload<S extends boolean | null | undefined | InventoryMovementDefaultArgs> = $Result.GetResult<Prisma.$InventoryMovementPayload, S>

  type InventoryMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InventoryMovementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InventoryMovementCountAggregateInputType | true
    }

  export interface InventoryMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InventoryMovement'], meta: { name: 'InventoryMovement' } }
    /**
     * Find zero or one InventoryMovement that matches the filter.
     * @param {InventoryMovementFindUniqueArgs} args - Arguments to find a InventoryMovement
     * @example
     * // Get one InventoryMovement
     * const inventoryMovement = await prisma.inventoryMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryMovementFindUniqueArgs>(args: SelectSubset<T, InventoryMovementFindUniqueArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InventoryMovement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InventoryMovementFindUniqueOrThrowArgs} args - Arguments to find a InventoryMovement
     * @example
     * // Get one InventoryMovement
     * const inventoryMovement = await prisma.inventoryMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, InventoryMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InventoryMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementFindFirstArgs} args - Arguments to find a InventoryMovement
     * @example
     * // Get one InventoryMovement
     * const inventoryMovement = await prisma.inventoryMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryMovementFindFirstArgs>(args?: SelectSubset<T, InventoryMovementFindFirstArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InventoryMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementFindFirstOrThrowArgs} args - Arguments to find a InventoryMovement
     * @example
     * // Get one InventoryMovement
     * const inventoryMovement = await prisma.inventoryMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, InventoryMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InventoryMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryMovements
     * const inventoryMovements = await prisma.inventoryMovement.findMany()
     * 
     * // Get first 10 InventoryMovements
     * const inventoryMovements = await prisma.inventoryMovement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryMovementWithIdOnly = await prisma.inventoryMovement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InventoryMovementFindManyArgs>(args?: SelectSubset<T, InventoryMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InventoryMovement.
     * @param {InventoryMovementCreateArgs} args - Arguments to create a InventoryMovement.
     * @example
     * // Create one InventoryMovement
     * const InventoryMovement = await prisma.inventoryMovement.create({
     *   data: {
     *     // ... data to create a InventoryMovement
     *   }
     * })
     * 
     */
    create<T extends InventoryMovementCreateArgs>(args: SelectSubset<T, InventoryMovementCreateArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InventoryMovements.
     * @param {InventoryMovementCreateManyArgs} args - Arguments to create many InventoryMovements.
     * @example
     * // Create many InventoryMovements
     * const inventoryMovement = await prisma.inventoryMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventoryMovementCreateManyArgs>(args?: SelectSubset<T, InventoryMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InventoryMovements and returns the data saved in the database.
     * @param {InventoryMovementCreateManyAndReturnArgs} args - Arguments to create many InventoryMovements.
     * @example
     * // Create many InventoryMovements
     * const inventoryMovement = await prisma.inventoryMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InventoryMovements and only return the `id`
     * const inventoryMovementWithIdOnly = await prisma.inventoryMovement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InventoryMovementCreateManyAndReturnArgs>(args?: SelectSubset<T, InventoryMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InventoryMovement.
     * @param {InventoryMovementDeleteArgs} args - Arguments to delete one InventoryMovement.
     * @example
     * // Delete one InventoryMovement
     * const InventoryMovement = await prisma.inventoryMovement.delete({
     *   where: {
     *     // ... filter to delete one InventoryMovement
     *   }
     * })
     * 
     */
    delete<T extends InventoryMovementDeleteArgs>(args: SelectSubset<T, InventoryMovementDeleteArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InventoryMovement.
     * @param {InventoryMovementUpdateArgs} args - Arguments to update one InventoryMovement.
     * @example
     * // Update one InventoryMovement
     * const inventoryMovement = await prisma.inventoryMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventoryMovementUpdateArgs>(args: SelectSubset<T, InventoryMovementUpdateArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InventoryMovements.
     * @param {InventoryMovementDeleteManyArgs} args - Arguments to filter InventoryMovements to delete.
     * @example
     * // Delete a few InventoryMovements
     * const { count } = await prisma.inventoryMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventoryMovementDeleteManyArgs>(args?: SelectSubset<T, InventoryMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryMovements
     * const inventoryMovement = await prisma.inventoryMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventoryMovementUpdateManyArgs>(args: SelectSubset<T, InventoryMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InventoryMovement.
     * @param {InventoryMovementUpsertArgs} args - Arguments to update or create a InventoryMovement.
     * @example
     * // Update or create a InventoryMovement
     * const inventoryMovement = await prisma.inventoryMovement.upsert({
     *   create: {
     *     // ... data to create a InventoryMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryMovement we want to update
     *   }
     * })
     */
    upsert<T extends InventoryMovementUpsertArgs>(args: SelectSubset<T, InventoryMovementUpsertArgs<ExtArgs>>): Prisma__InventoryMovementClient<$Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InventoryMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementCountArgs} args - Arguments to filter InventoryMovements to count.
     * @example
     * // Count the number of InventoryMovements
     * const count = await prisma.inventoryMovement.count({
     *   where: {
     *     // ... the filter for the InventoryMovements we want to count
     *   }
     * })
    **/
    count<T extends InventoryMovementCountArgs>(
      args?: Subset<T, InventoryMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventoryMovementAggregateArgs>(args: Subset<T, InventoryMovementAggregateArgs>): Prisma.PrismaPromise<GetInventoryMovementAggregateType<T>>

    /**
     * Group by InventoryMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryMovementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventoryMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryMovementGroupByArgs['orderBy'] }
        : { orderBy?: InventoryMovementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventoryMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InventoryMovement model
   */
  readonly fields: InventoryMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventoryMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variant<T extends ProductVariantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariantDefaultArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InventoryMovement model
   */ 
  interface InventoryMovementFieldRefs {
    readonly id: FieldRef<"InventoryMovement", 'String'>
    readonly variantId: FieldRef<"InventoryMovement", 'String'>
    readonly type: FieldRef<"InventoryMovement", 'String'>
    readonly quantity: FieldRef<"InventoryMovement", 'Int'>
    readonly reason: FieldRef<"InventoryMovement", 'String'>
    readonly reference: FieldRef<"InventoryMovement", 'String'>
    readonly createdBy: FieldRef<"InventoryMovement", 'String'>
    readonly createdAt: FieldRef<"InventoryMovement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InventoryMovement findUnique
   */
  export type InventoryMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryMovement to fetch.
     */
    where: InventoryMovementWhereUniqueInput
  }

  /**
   * InventoryMovement findUniqueOrThrow
   */
  export type InventoryMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryMovement to fetch.
     */
    where: InventoryMovementWhereUniqueInput
  }

  /**
   * InventoryMovement findFirst
   */
  export type InventoryMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryMovement to fetch.
     */
    where?: InventoryMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryMovements to fetch.
     */
    orderBy?: InventoryMovementOrderByWithRelationInput | InventoryMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryMovements.
     */
    cursor?: InventoryMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryMovements.
     */
    distinct?: InventoryMovementScalarFieldEnum | InventoryMovementScalarFieldEnum[]
  }

  /**
   * InventoryMovement findFirstOrThrow
   */
  export type InventoryMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryMovement to fetch.
     */
    where?: InventoryMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryMovements to fetch.
     */
    orderBy?: InventoryMovementOrderByWithRelationInput | InventoryMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryMovements.
     */
    cursor?: InventoryMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryMovements.
     */
    distinct?: InventoryMovementScalarFieldEnum | InventoryMovementScalarFieldEnum[]
  }

  /**
   * InventoryMovement findMany
   */
  export type InventoryMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryMovements to fetch.
     */
    where?: InventoryMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryMovements to fetch.
     */
    orderBy?: InventoryMovementOrderByWithRelationInput | InventoryMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryMovements.
     */
    cursor?: InventoryMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryMovements.
     */
    skip?: number
    distinct?: InventoryMovementScalarFieldEnum | InventoryMovementScalarFieldEnum[]
  }

  /**
   * InventoryMovement create
   */
  export type InventoryMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * The data needed to create a InventoryMovement.
     */
    data: XOR<InventoryMovementCreateInput, InventoryMovementUncheckedCreateInput>
  }

  /**
   * InventoryMovement createMany
   */
  export type InventoryMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryMovements.
     */
    data: InventoryMovementCreateManyInput | InventoryMovementCreateManyInput[]
  }

  /**
   * InventoryMovement createManyAndReturn
   */
  export type InventoryMovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InventoryMovements.
     */
    data: InventoryMovementCreateManyInput | InventoryMovementCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InventoryMovement update
   */
  export type InventoryMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * The data needed to update a InventoryMovement.
     */
    data: XOR<InventoryMovementUpdateInput, InventoryMovementUncheckedUpdateInput>
    /**
     * Choose, which InventoryMovement to update.
     */
    where: InventoryMovementWhereUniqueInput
  }

  /**
   * InventoryMovement updateMany
   */
  export type InventoryMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryMovements.
     */
    data: XOR<InventoryMovementUpdateManyMutationInput, InventoryMovementUncheckedUpdateManyInput>
    /**
     * Filter which InventoryMovements to update
     */
    where?: InventoryMovementWhereInput
  }

  /**
   * InventoryMovement upsert
   */
  export type InventoryMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * The filter to search for the InventoryMovement to update in case it exists.
     */
    where: InventoryMovementWhereUniqueInput
    /**
     * In case the InventoryMovement found by the `where` argument doesn't exist, create a new InventoryMovement with this data.
     */
    create: XOR<InventoryMovementCreateInput, InventoryMovementUncheckedCreateInput>
    /**
     * In case the InventoryMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryMovementUpdateInput, InventoryMovementUncheckedUpdateInput>
  }

  /**
   * InventoryMovement delete
   */
  export type InventoryMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
    /**
     * Filter which InventoryMovement to delete.
     */
    where: InventoryMovementWhereUniqueInput
  }

  /**
   * InventoryMovement deleteMany
   */
  export type InventoryMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryMovements to delete
     */
    where?: InventoryMovementWhereInput
  }

  /**
   * InventoryMovement without action
   */
  export type InventoryMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: InventoryMovementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryMovementInclude<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    id: string
    key: string
    value: string
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }


  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingWithIdOnly = await prisma.setting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingWithIdOnly = await prisma.setting.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */ 
  interface SettingFieldRefs {
    readonly id: FieldRef<"Setting", 'String'>
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'String'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
  }


  /**
   * Model PrinterConfig
   */

  export type AggregatePrinterConfig = {
    _count: PrinterConfigCountAggregateOutputType | null
    _avg: PrinterConfigAvgAggregateOutputType | null
    _sum: PrinterConfigSumAggregateOutputType | null
    _min: PrinterConfigMinAggregateOutputType | null
    _max: PrinterConfigMaxAggregateOutputType | null
  }

  export type PrinterConfigAvgAggregateOutputType = {
    width: number | null
  }

  export type PrinterConfigSumAggregateOutputType = {
    width: number | null
  }

  export type PrinterConfigMinAggregateOutputType = {
    id: string | null
    type: string | null
    printerName: string | null
    port: string | null
    width: number | null
    settings: string | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type PrinterConfigMaxAggregateOutputType = {
    id: string | null
    type: string | null
    printerName: string | null
    port: string | null
    width: number | null
    settings: string | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type PrinterConfigCountAggregateOutputType = {
    id: number
    type: number
    printerName: number
    port: number
    width: number
    settings: number
    isActive: number
    updatedAt: number
    _all: number
  }


  export type PrinterConfigAvgAggregateInputType = {
    width?: true
  }

  export type PrinterConfigSumAggregateInputType = {
    width?: true
  }

  export type PrinterConfigMinAggregateInputType = {
    id?: true
    type?: true
    printerName?: true
    port?: true
    width?: true
    settings?: true
    isActive?: true
    updatedAt?: true
  }

  export type PrinterConfigMaxAggregateInputType = {
    id?: true
    type?: true
    printerName?: true
    port?: true
    width?: true
    settings?: true
    isActive?: true
    updatedAt?: true
  }

  export type PrinterConfigCountAggregateInputType = {
    id?: true
    type?: true
    printerName?: true
    port?: true
    width?: true
    settings?: true
    isActive?: true
    updatedAt?: true
    _all?: true
  }

  export type PrinterConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrinterConfig to aggregate.
     */
    where?: PrinterConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterConfigs to fetch.
     */
    orderBy?: PrinterConfigOrderByWithRelationInput | PrinterConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrinterConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrinterConfigs
    **/
    _count?: true | PrinterConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrinterConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrinterConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrinterConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrinterConfigMaxAggregateInputType
  }

  export type GetPrinterConfigAggregateType<T extends PrinterConfigAggregateArgs> = {
        [P in keyof T & keyof AggregatePrinterConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrinterConfig[P]>
      : GetScalarType<T[P], AggregatePrinterConfig[P]>
  }




  export type PrinterConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrinterConfigWhereInput
    orderBy?: PrinterConfigOrderByWithAggregationInput | PrinterConfigOrderByWithAggregationInput[]
    by: PrinterConfigScalarFieldEnum[] | PrinterConfigScalarFieldEnum
    having?: PrinterConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrinterConfigCountAggregateInputType | true
    _avg?: PrinterConfigAvgAggregateInputType
    _sum?: PrinterConfigSumAggregateInputType
    _min?: PrinterConfigMinAggregateInputType
    _max?: PrinterConfigMaxAggregateInputType
  }

  export type PrinterConfigGroupByOutputType = {
    id: string
    type: string
    printerName: string
    port: string | null
    width: number
    settings: string | null
    isActive: boolean
    updatedAt: Date
    _count: PrinterConfigCountAggregateOutputType | null
    _avg: PrinterConfigAvgAggregateOutputType | null
    _sum: PrinterConfigSumAggregateOutputType | null
    _min: PrinterConfigMinAggregateOutputType | null
    _max: PrinterConfigMaxAggregateOutputType | null
  }

  type GetPrinterConfigGroupByPayload<T extends PrinterConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrinterConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrinterConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrinterConfigGroupByOutputType[P]>
            : GetScalarType<T[P], PrinterConfigGroupByOutputType[P]>
        }
      >
    >


  export type PrinterConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    printerName?: boolean
    port?: boolean
    width?: boolean
    settings?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["printerConfig"]>

  export type PrinterConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    printerName?: boolean
    port?: boolean
    width?: boolean
    settings?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["printerConfig"]>

  export type PrinterConfigSelectScalar = {
    id?: boolean
    type?: boolean
    printerName?: boolean
    port?: boolean
    width?: boolean
    settings?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }


  export type $PrinterConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrinterConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      printerName: string
      port: string | null
      width: number
      settings: string | null
      isActive: boolean
      updatedAt: Date
    }, ExtArgs["result"]["printerConfig"]>
    composites: {}
  }

  type PrinterConfigGetPayload<S extends boolean | null | undefined | PrinterConfigDefaultArgs> = $Result.GetResult<Prisma.$PrinterConfigPayload, S>

  type PrinterConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PrinterConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrinterConfigCountAggregateInputType | true
    }

  export interface PrinterConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrinterConfig'], meta: { name: 'PrinterConfig' } }
    /**
     * Find zero or one PrinterConfig that matches the filter.
     * @param {PrinterConfigFindUniqueArgs} args - Arguments to find a PrinterConfig
     * @example
     * // Get one PrinterConfig
     * const printerConfig = await prisma.printerConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrinterConfigFindUniqueArgs>(args: SelectSubset<T, PrinterConfigFindUniqueArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PrinterConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PrinterConfigFindUniqueOrThrowArgs} args - Arguments to find a PrinterConfig
     * @example
     * // Get one PrinterConfig
     * const printerConfig = await prisma.printerConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrinterConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, PrinterConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PrinterConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigFindFirstArgs} args - Arguments to find a PrinterConfig
     * @example
     * // Get one PrinterConfig
     * const printerConfig = await prisma.printerConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrinterConfigFindFirstArgs>(args?: SelectSubset<T, PrinterConfigFindFirstArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PrinterConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigFindFirstOrThrowArgs} args - Arguments to find a PrinterConfig
     * @example
     * // Get one PrinterConfig
     * const printerConfig = await prisma.printerConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrinterConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, PrinterConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PrinterConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrinterConfigs
     * const printerConfigs = await prisma.printerConfig.findMany()
     * 
     * // Get first 10 PrinterConfigs
     * const printerConfigs = await prisma.printerConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const printerConfigWithIdOnly = await prisma.printerConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrinterConfigFindManyArgs>(args?: SelectSubset<T, PrinterConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PrinterConfig.
     * @param {PrinterConfigCreateArgs} args - Arguments to create a PrinterConfig.
     * @example
     * // Create one PrinterConfig
     * const PrinterConfig = await prisma.printerConfig.create({
     *   data: {
     *     // ... data to create a PrinterConfig
     *   }
     * })
     * 
     */
    create<T extends PrinterConfigCreateArgs>(args: SelectSubset<T, PrinterConfigCreateArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PrinterConfigs.
     * @param {PrinterConfigCreateManyArgs} args - Arguments to create many PrinterConfigs.
     * @example
     * // Create many PrinterConfigs
     * const printerConfig = await prisma.printerConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrinterConfigCreateManyArgs>(args?: SelectSubset<T, PrinterConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrinterConfigs and returns the data saved in the database.
     * @param {PrinterConfigCreateManyAndReturnArgs} args - Arguments to create many PrinterConfigs.
     * @example
     * // Create many PrinterConfigs
     * const printerConfig = await prisma.printerConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrinterConfigs and only return the `id`
     * const printerConfigWithIdOnly = await prisma.printerConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrinterConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, PrinterConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PrinterConfig.
     * @param {PrinterConfigDeleteArgs} args - Arguments to delete one PrinterConfig.
     * @example
     * // Delete one PrinterConfig
     * const PrinterConfig = await prisma.printerConfig.delete({
     *   where: {
     *     // ... filter to delete one PrinterConfig
     *   }
     * })
     * 
     */
    delete<T extends PrinterConfigDeleteArgs>(args: SelectSubset<T, PrinterConfigDeleteArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PrinterConfig.
     * @param {PrinterConfigUpdateArgs} args - Arguments to update one PrinterConfig.
     * @example
     * // Update one PrinterConfig
     * const printerConfig = await prisma.printerConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrinterConfigUpdateArgs>(args: SelectSubset<T, PrinterConfigUpdateArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PrinterConfigs.
     * @param {PrinterConfigDeleteManyArgs} args - Arguments to filter PrinterConfigs to delete.
     * @example
     * // Delete a few PrinterConfigs
     * const { count } = await prisma.printerConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrinterConfigDeleteManyArgs>(args?: SelectSubset<T, PrinterConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrinterConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrinterConfigs
     * const printerConfig = await prisma.printerConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrinterConfigUpdateManyArgs>(args: SelectSubset<T, PrinterConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PrinterConfig.
     * @param {PrinterConfigUpsertArgs} args - Arguments to update or create a PrinterConfig.
     * @example
     * // Update or create a PrinterConfig
     * const printerConfig = await prisma.printerConfig.upsert({
     *   create: {
     *     // ... data to create a PrinterConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrinterConfig we want to update
     *   }
     * })
     */
    upsert<T extends PrinterConfigUpsertArgs>(args: SelectSubset<T, PrinterConfigUpsertArgs<ExtArgs>>): Prisma__PrinterConfigClient<$Result.GetResult<Prisma.$PrinterConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PrinterConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigCountArgs} args - Arguments to filter PrinterConfigs to count.
     * @example
     * // Count the number of PrinterConfigs
     * const count = await prisma.printerConfig.count({
     *   where: {
     *     // ... the filter for the PrinterConfigs we want to count
     *   }
     * })
    **/
    count<T extends PrinterConfigCountArgs>(
      args?: Subset<T, PrinterConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrinterConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrinterConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrinterConfigAggregateArgs>(args: Subset<T, PrinterConfigAggregateArgs>): Prisma.PrismaPromise<GetPrinterConfigAggregateType<T>>

    /**
     * Group by PrinterConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrinterConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrinterConfigGroupByArgs['orderBy'] }
        : { orderBy?: PrinterConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrinterConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrinterConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrinterConfig model
   */
  readonly fields: PrinterConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrinterConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrinterConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PrinterConfig model
   */ 
  interface PrinterConfigFieldRefs {
    readonly id: FieldRef<"PrinterConfig", 'String'>
    readonly type: FieldRef<"PrinterConfig", 'String'>
    readonly printerName: FieldRef<"PrinterConfig", 'String'>
    readonly port: FieldRef<"PrinterConfig", 'String'>
    readonly width: FieldRef<"PrinterConfig", 'Int'>
    readonly settings: FieldRef<"PrinterConfig", 'String'>
    readonly isActive: FieldRef<"PrinterConfig", 'Boolean'>
    readonly updatedAt: FieldRef<"PrinterConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrinterConfig findUnique
   */
  export type PrinterConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * Filter, which PrinterConfig to fetch.
     */
    where: PrinterConfigWhereUniqueInput
  }

  /**
   * PrinterConfig findUniqueOrThrow
   */
  export type PrinterConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * Filter, which PrinterConfig to fetch.
     */
    where: PrinterConfigWhereUniqueInput
  }

  /**
   * PrinterConfig findFirst
   */
  export type PrinterConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * Filter, which PrinterConfig to fetch.
     */
    where?: PrinterConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterConfigs to fetch.
     */
    orderBy?: PrinterConfigOrderByWithRelationInput | PrinterConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrinterConfigs.
     */
    cursor?: PrinterConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrinterConfigs.
     */
    distinct?: PrinterConfigScalarFieldEnum | PrinterConfigScalarFieldEnum[]
  }

  /**
   * PrinterConfig findFirstOrThrow
   */
  export type PrinterConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * Filter, which PrinterConfig to fetch.
     */
    where?: PrinterConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterConfigs to fetch.
     */
    orderBy?: PrinterConfigOrderByWithRelationInput | PrinterConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrinterConfigs.
     */
    cursor?: PrinterConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrinterConfigs.
     */
    distinct?: PrinterConfigScalarFieldEnum | PrinterConfigScalarFieldEnum[]
  }

  /**
   * PrinterConfig findMany
   */
  export type PrinterConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * Filter, which PrinterConfigs to fetch.
     */
    where?: PrinterConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterConfigs to fetch.
     */
    orderBy?: PrinterConfigOrderByWithRelationInput | PrinterConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrinterConfigs.
     */
    cursor?: PrinterConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterConfigs.
     */
    skip?: number
    distinct?: PrinterConfigScalarFieldEnum | PrinterConfigScalarFieldEnum[]
  }

  /**
   * PrinterConfig create
   */
  export type PrinterConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a PrinterConfig.
     */
    data: XOR<PrinterConfigCreateInput, PrinterConfigUncheckedCreateInput>
  }

  /**
   * PrinterConfig createMany
   */
  export type PrinterConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrinterConfigs.
     */
    data: PrinterConfigCreateManyInput | PrinterConfigCreateManyInput[]
  }

  /**
   * PrinterConfig createManyAndReturn
   */
  export type PrinterConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PrinterConfigs.
     */
    data: PrinterConfigCreateManyInput | PrinterConfigCreateManyInput[]
  }

  /**
   * PrinterConfig update
   */
  export type PrinterConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a PrinterConfig.
     */
    data: XOR<PrinterConfigUpdateInput, PrinterConfigUncheckedUpdateInput>
    /**
     * Choose, which PrinterConfig to update.
     */
    where: PrinterConfigWhereUniqueInput
  }

  /**
   * PrinterConfig updateMany
   */
  export type PrinterConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrinterConfigs.
     */
    data: XOR<PrinterConfigUpdateManyMutationInput, PrinterConfigUncheckedUpdateManyInput>
    /**
     * Filter which PrinterConfigs to update
     */
    where?: PrinterConfigWhereInput
  }

  /**
   * PrinterConfig upsert
   */
  export type PrinterConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the PrinterConfig to update in case it exists.
     */
    where: PrinterConfigWhereUniqueInput
    /**
     * In case the PrinterConfig found by the `where` argument doesn't exist, create a new PrinterConfig with this data.
     */
    create: XOR<PrinterConfigCreateInput, PrinterConfigUncheckedCreateInput>
    /**
     * In case the PrinterConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrinterConfigUpdateInput, PrinterConfigUncheckedUpdateInput>
  }

  /**
   * PrinterConfig delete
   */
  export type PrinterConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
    /**
     * Filter which PrinterConfig to delete.
     */
    where: PrinterConfigWhereUniqueInput
  }

  /**
   * PrinterConfig deleteMany
   */
  export type PrinterConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrinterConfigs to delete
     */
    where?: PrinterConfigWhereInput
  }

  /**
   * PrinterConfig without action
   */
  export type PrinterConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterConfig
     */
    select?: PrinterConfigSelect<ExtArgs> | null
  }


  /**
   * Model SyncQueue
   */

  export type AggregateSyncQueue = {
    _count: SyncQueueCountAggregateOutputType | null
    _avg: SyncQueueAvgAggregateOutputType | null
    _sum: SyncQueueSumAggregateOutputType | null
    _min: SyncQueueMinAggregateOutputType | null
    _max: SyncQueueMaxAggregateOutputType | null
  }

  export type SyncQueueAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type SyncQueueSumAggregateOutputType = {
    retryCount: number | null
  }

  export type SyncQueueMinAggregateOutputType = {
    id: string | null
    action: string | null
    model: string | null
    data: string | null
    status: string | null
    retryCount: number | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SyncQueueMaxAggregateOutputType = {
    id: string | null
    action: string | null
    model: string | null
    data: string | null
    status: string | null
    retryCount: number | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SyncQueueCountAggregateOutputType = {
    id: number
    action: number
    model: number
    data: number
    status: number
    retryCount: number
    error: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SyncQueueAvgAggregateInputType = {
    retryCount?: true
  }

  export type SyncQueueSumAggregateInputType = {
    retryCount?: true
  }

  export type SyncQueueMinAggregateInputType = {
    id?: true
    action?: true
    model?: true
    data?: true
    status?: true
    retryCount?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SyncQueueMaxAggregateInputType = {
    id?: true
    action?: true
    model?: true
    data?: true
    status?: true
    retryCount?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SyncQueueCountAggregateInputType = {
    id?: true
    action?: true
    model?: true
    data?: true
    status?: true
    retryCount?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SyncQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncQueue to aggregate.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncQueues
    **/
    _count?: true | SyncQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncQueueMaxAggregateInputType
  }

  export type GetSyncQueueAggregateType<T extends SyncQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncQueue[P]>
      : GetScalarType<T[P], AggregateSyncQueue[P]>
  }




  export type SyncQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncQueueWhereInput
    orderBy?: SyncQueueOrderByWithAggregationInput | SyncQueueOrderByWithAggregationInput[]
    by: SyncQueueScalarFieldEnum[] | SyncQueueScalarFieldEnum
    having?: SyncQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncQueueCountAggregateInputType | true
    _avg?: SyncQueueAvgAggregateInputType
    _sum?: SyncQueueSumAggregateInputType
    _min?: SyncQueueMinAggregateInputType
    _max?: SyncQueueMaxAggregateInputType
  }

  export type SyncQueueGroupByOutputType = {
    id: string
    action: string
    model: string
    data: string
    status: string
    retryCount: number
    error: string | null
    createdAt: Date
    updatedAt: Date
    _count: SyncQueueCountAggregateOutputType | null
    _avg: SyncQueueAvgAggregateOutputType | null
    _sum: SyncQueueSumAggregateOutputType | null
    _min: SyncQueueMinAggregateOutputType | null
    _max: SyncQueueMaxAggregateOutputType | null
  }

  type GetSyncQueueGroupByPayload<T extends SyncQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncQueueGroupByOutputType[P]>
            : GetScalarType<T[P], SyncQueueGroupByOutputType[P]>
        }
      >
    >


  export type SyncQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    model?: boolean
    data?: boolean
    status?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    model?: boolean
    data?: boolean
    status?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectScalar = {
    id?: boolean
    action?: boolean
    model?: boolean
    data?: boolean
    status?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SyncQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      model: string
      data: string
      status: string
      retryCount: number
      error: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["syncQueue"]>
    composites: {}
  }

  type SyncQueueGetPayload<S extends boolean | null | undefined | SyncQueueDefaultArgs> = $Result.GetResult<Prisma.$SyncQueuePayload, S>

  type SyncQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SyncQueueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SyncQueueCountAggregateInputType | true
    }

  export interface SyncQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncQueue'], meta: { name: 'SyncQueue' } }
    /**
     * Find zero or one SyncQueue that matches the filter.
     * @param {SyncQueueFindUniqueArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncQueueFindUniqueArgs>(args: SelectSubset<T, SyncQueueFindUniqueArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SyncQueue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SyncQueueFindUniqueOrThrowArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SyncQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindFirstArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncQueueFindFirstArgs>(args?: SelectSubset<T, SyncQueueFindFirstArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SyncQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindFirstOrThrowArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SyncQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncQueues
     * const syncQueues = await prisma.syncQueue.findMany()
     * 
     * // Get first 10 SyncQueues
     * const syncQueues = await prisma.syncQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncQueueFindManyArgs>(args?: SelectSubset<T, SyncQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SyncQueue.
     * @param {SyncQueueCreateArgs} args - Arguments to create a SyncQueue.
     * @example
     * // Create one SyncQueue
     * const SyncQueue = await prisma.syncQueue.create({
     *   data: {
     *     // ... data to create a SyncQueue
     *   }
     * })
     * 
     */
    create<T extends SyncQueueCreateArgs>(args: SelectSubset<T, SyncQueueCreateArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SyncQueues.
     * @param {SyncQueueCreateManyArgs} args - Arguments to create many SyncQueues.
     * @example
     * // Create many SyncQueues
     * const syncQueue = await prisma.syncQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncQueueCreateManyArgs>(args?: SelectSubset<T, SyncQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncQueues and returns the data saved in the database.
     * @param {SyncQueueCreateManyAndReturnArgs} args - Arguments to create many SyncQueues.
     * @example
     * // Create many SyncQueues
     * const syncQueue = await prisma.syncQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncQueues and only return the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SyncQueue.
     * @param {SyncQueueDeleteArgs} args - Arguments to delete one SyncQueue.
     * @example
     * // Delete one SyncQueue
     * const SyncQueue = await prisma.syncQueue.delete({
     *   where: {
     *     // ... filter to delete one SyncQueue
     *   }
     * })
     * 
     */
    delete<T extends SyncQueueDeleteArgs>(args: SelectSubset<T, SyncQueueDeleteArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SyncQueue.
     * @param {SyncQueueUpdateArgs} args - Arguments to update one SyncQueue.
     * @example
     * // Update one SyncQueue
     * const syncQueue = await prisma.syncQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncQueueUpdateArgs>(args: SelectSubset<T, SyncQueueUpdateArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SyncQueues.
     * @param {SyncQueueDeleteManyArgs} args - Arguments to filter SyncQueues to delete.
     * @example
     * // Delete a few SyncQueues
     * const { count } = await prisma.syncQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncQueueDeleteManyArgs>(args?: SelectSubset<T, SyncQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncQueues
     * const syncQueue = await prisma.syncQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncQueueUpdateManyArgs>(args: SelectSubset<T, SyncQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SyncQueue.
     * @param {SyncQueueUpsertArgs} args - Arguments to update or create a SyncQueue.
     * @example
     * // Update or create a SyncQueue
     * const syncQueue = await prisma.syncQueue.upsert({
     *   create: {
     *     // ... data to create a SyncQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncQueue we want to update
     *   }
     * })
     */
    upsert<T extends SyncQueueUpsertArgs>(args: SelectSubset<T, SyncQueueUpsertArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueCountArgs} args - Arguments to filter SyncQueues to count.
     * @example
     * // Count the number of SyncQueues
     * const count = await prisma.syncQueue.count({
     *   where: {
     *     // ... the filter for the SyncQueues we want to count
     *   }
     * })
    **/
    count<T extends SyncQueueCountArgs>(
      args?: Subset<T, SyncQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncQueueAggregateArgs>(args: Subset<T, SyncQueueAggregateArgs>): Prisma.PrismaPromise<GetSyncQueueAggregateType<T>>

    /**
     * Group by SyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncQueueGroupByArgs['orderBy'] }
        : { orderBy?: SyncQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncQueue model
   */
  readonly fields: SyncQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncQueue model
   */ 
  interface SyncQueueFieldRefs {
    readonly id: FieldRef<"SyncQueue", 'String'>
    readonly action: FieldRef<"SyncQueue", 'String'>
    readonly model: FieldRef<"SyncQueue", 'String'>
    readonly data: FieldRef<"SyncQueue", 'String'>
    readonly status: FieldRef<"SyncQueue", 'String'>
    readonly retryCount: FieldRef<"SyncQueue", 'Int'>
    readonly error: FieldRef<"SyncQueue", 'String'>
    readonly createdAt: FieldRef<"SyncQueue", 'DateTime'>
    readonly updatedAt: FieldRef<"SyncQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncQueue findUnique
   */
  export type SyncQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue findUniqueOrThrow
   */
  export type SyncQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue findFirst
   */
  export type SyncQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncQueues.
     */
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue findFirstOrThrow
   */
  export type SyncQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncQueues.
     */
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue findMany
   */
  export type SyncQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which SyncQueues to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue create
   */
  export type SyncQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * The data needed to create a SyncQueue.
     */
    data: XOR<SyncQueueCreateInput, SyncQueueUncheckedCreateInput>
  }

  /**
   * SyncQueue createMany
   */
  export type SyncQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncQueues.
     */
    data: SyncQueueCreateManyInput | SyncQueueCreateManyInput[]
  }

  /**
   * SyncQueue createManyAndReturn
   */
  export type SyncQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SyncQueues.
     */
    data: SyncQueueCreateManyInput | SyncQueueCreateManyInput[]
  }

  /**
   * SyncQueue update
   */
  export type SyncQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * The data needed to update a SyncQueue.
     */
    data: XOR<SyncQueueUpdateInput, SyncQueueUncheckedUpdateInput>
    /**
     * Choose, which SyncQueue to update.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue updateMany
   */
  export type SyncQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncQueues.
     */
    data: XOR<SyncQueueUpdateManyMutationInput, SyncQueueUncheckedUpdateManyInput>
    /**
     * Filter which SyncQueues to update
     */
    where?: SyncQueueWhereInput
  }

  /**
   * SyncQueue upsert
   */
  export type SyncQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * The filter to search for the SyncQueue to update in case it exists.
     */
    where: SyncQueueWhereUniqueInput
    /**
     * In case the SyncQueue found by the `where` argument doesn't exist, create a new SyncQueue with this data.
     */
    create: XOR<SyncQueueCreateInput, SyncQueueUncheckedCreateInput>
    /**
     * In case the SyncQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncQueueUpdateInput, SyncQueueUncheckedUpdateInput>
  }

  /**
   * SyncQueue delete
   */
  export type SyncQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Filter which SyncQueue to delete.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue deleteMany
   */
  export type SyncQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncQueues to delete
     */
    where?: SyncQueueWhereInput
  }

  /**
   * SyncQueue without action
   */
  export type SyncQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    name: 'name',
    role: 'role',
    isActive: 'isActive',
    permPrintSticker: 'permPrintSticker',
    permAddItem: 'permAddItem',
    permDeleteProduct: 'permDeleteProduct',
    permVoidSale: 'permVoidSale',
    permViewReports: 'permViewReports',
    permEditSettings: 'permEditSettings',
    permManageProducts: 'permManageProducts',
    permViewSales: 'permViewSales',
    permViewGstReports: 'permViewGstReports',
    permEditSales: 'permEditSales',
    permManageInventory: 'permManageInventory',
    permManageUsers: 'permManageUsers',
    permViewCostPrice: 'permViewCostPrice',
    permChangePayment: 'permChangePayment',
    permDeleteAudit: 'permDeleteAudit',
    permBulkUpdate: 'permBulkUpdate',
    permBackDateSale: 'permBackDateSale',
    permViewInsights: 'permViewInsights',
    maxDiscount: 'maxDiscount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    categoryId: 'categoryId',
    hsn: 'hsn',
    taxRate: 'taxRate',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductVariantScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    sku: 'sku',
    barcode: 'barcode',
    size: 'size',
    color: 'color',
    mrp: 'mrp',
    sellingPrice: 'sellingPrice',
    costPrice: 'costPrice',
    stock: 'stock',
    minStock: 'minStock',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    address: 'address',
    gstin: 'gstin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    billNo: 'billNo',
    userId: 'userId',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    subtotal: 'subtotal',
    discount: 'discount',
    discountPercent: 'discountPercent',
    taxAmount: 'taxAmount',
    cgst: 'cgst',
    sgst: 'sgst',
    grandTotal: 'grandTotal',
    paymentMethod: 'paymentMethod',
    paidAmount: 'paidAmount',
    changeAmount: 'changeAmount',
    status: 'status',
    remarks: 'remarks',
    isHistorical: 'isHistorical',
    importedFrom: 'importedFrom',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const SaleItemScalarFieldEnum: {
    id: 'id',
    saleId: 'saleId',
    variantId: 'variantId',
    productName: 'productName',
    variantInfo: 'variantInfo',
    quantity: 'quantity',
    mrp: 'mrp',
    sellingPrice: 'sellingPrice',
    discount: 'discount',
    taxRate: 'taxRate',
    taxAmount: 'taxAmount',
    total: 'total',
    createdAt: 'createdAt'
  };

  export type SaleItemScalarFieldEnum = (typeof SaleItemScalarFieldEnum)[keyof typeof SaleItemScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    details: 'details',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const InventoryMovementScalarFieldEnum: {
    id: 'id',
    variantId: 'variantId',
    type: 'type',
    quantity: 'quantity',
    reason: 'reason',
    reference: 'reference',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type InventoryMovementScalarFieldEnum = (typeof InventoryMovementScalarFieldEnum)[keyof typeof InventoryMovementScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const PrinterConfigScalarFieldEnum: {
    id: 'id',
    type: 'type',
    printerName: 'printerName',
    port: 'port',
    width: 'width',
    settings: 'settings',
    isActive: 'isActive',
    updatedAt: 'updatedAt'
  };

  export type PrinterConfigScalarFieldEnum = (typeof PrinterConfigScalarFieldEnum)[keyof typeof PrinterConfigScalarFieldEnum]


  export const SyncQueueScalarFieldEnum: {
    id: 'id',
    action: 'action',
    model: 'model',
    data: 'data',
    status: 'status',
    retryCount: 'retryCount',
    error: 'error',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SyncQueueScalarFieldEnum = (typeof SyncQueueScalarFieldEnum)[keyof typeof SyncQueueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    permPrintSticker?: BoolFilter<"User"> | boolean
    permAddItem?: BoolFilter<"User"> | boolean
    permDeleteProduct?: BoolFilter<"User"> | boolean
    permVoidSale?: BoolFilter<"User"> | boolean
    permViewReports?: BoolFilter<"User"> | boolean
    permEditSettings?: BoolFilter<"User"> | boolean
    permManageProducts?: BoolFilter<"User"> | boolean
    permViewSales?: BoolFilter<"User"> | boolean
    permViewGstReports?: BoolFilter<"User"> | boolean
    permEditSales?: BoolFilter<"User"> | boolean
    permManageInventory?: BoolFilter<"User"> | boolean
    permManageUsers?: BoolFilter<"User"> | boolean
    permViewCostPrice?: BoolFilter<"User"> | boolean
    permChangePayment?: BoolFilter<"User"> | boolean
    permDeleteAudit?: BoolFilter<"User"> | boolean
    permBulkUpdate?: BoolFilter<"User"> | boolean
    permBackDateSale?: BoolFilter<"User"> | boolean
    permViewInsights?: BoolFilter<"User"> | boolean
    maxDiscount?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sales?: SaleListRelationFilter
    AuditLog?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    permPrintSticker?: SortOrder
    permAddItem?: SortOrder
    permDeleteProduct?: SortOrder
    permVoidSale?: SortOrder
    permViewReports?: SortOrder
    permEditSettings?: SortOrder
    permManageProducts?: SortOrder
    permViewSales?: SortOrder
    permViewGstReports?: SortOrder
    permEditSales?: SortOrder
    permManageInventory?: SortOrder
    permManageUsers?: SortOrder
    permViewCostPrice?: SortOrder
    permChangePayment?: SortOrder
    permDeleteAudit?: SortOrder
    permBulkUpdate?: SortOrder
    permBackDateSale?: SortOrder
    permViewInsights?: SortOrder
    maxDiscount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
    AuditLog?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    permPrintSticker?: BoolFilter<"User"> | boolean
    permAddItem?: BoolFilter<"User"> | boolean
    permDeleteProduct?: BoolFilter<"User"> | boolean
    permVoidSale?: BoolFilter<"User"> | boolean
    permViewReports?: BoolFilter<"User"> | boolean
    permEditSettings?: BoolFilter<"User"> | boolean
    permManageProducts?: BoolFilter<"User"> | boolean
    permViewSales?: BoolFilter<"User"> | boolean
    permViewGstReports?: BoolFilter<"User"> | boolean
    permEditSales?: BoolFilter<"User"> | boolean
    permManageInventory?: BoolFilter<"User"> | boolean
    permManageUsers?: BoolFilter<"User"> | boolean
    permViewCostPrice?: BoolFilter<"User"> | boolean
    permChangePayment?: BoolFilter<"User"> | boolean
    permDeleteAudit?: BoolFilter<"User"> | boolean
    permBulkUpdate?: BoolFilter<"User"> | boolean
    permBackDateSale?: BoolFilter<"User"> | boolean
    permViewInsights?: BoolFilter<"User"> | boolean
    maxDiscount?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sales?: SaleListRelationFilter
    AuditLog?: AuditLogListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    permPrintSticker?: SortOrder
    permAddItem?: SortOrder
    permDeleteProduct?: SortOrder
    permVoidSale?: SortOrder
    permViewReports?: SortOrder
    permEditSettings?: SortOrder
    permManageProducts?: SortOrder
    permViewSales?: SortOrder
    permViewGstReports?: SortOrder
    permEditSales?: SortOrder
    permManageInventory?: SortOrder
    permManageUsers?: SortOrder
    permViewCostPrice?: SortOrder
    permChangePayment?: SortOrder
    permDeleteAudit?: SortOrder
    permBulkUpdate?: SortOrder
    permBackDateSale?: SortOrder
    permViewInsights?: SortOrder
    maxDiscount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    permPrintSticker?: BoolWithAggregatesFilter<"User"> | boolean
    permAddItem?: BoolWithAggregatesFilter<"User"> | boolean
    permDeleteProduct?: BoolWithAggregatesFilter<"User"> | boolean
    permVoidSale?: BoolWithAggregatesFilter<"User"> | boolean
    permViewReports?: BoolWithAggregatesFilter<"User"> | boolean
    permEditSettings?: BoolWithAggregatesFilter<"User"> | boolean
    permManageProducts?: BoolWithAggregatesFilter<"User"> | boolean
    permViewSales?: BoolWithAggregatesFilter<"User"> | boolean
    permViewGstReports?: BoolWithAggregatesFilter<"User"> | boolean
    permEditSales?: BoolWithAggregatesFilter<"User"> | boolean
    permManageInventory?: BoolWithAggregatesFilter<"User"> | boolean
    permManageUsers?: BoolWithAggregatesFilter<"User"> | boolean
    permViewCostPrice?: BoolWithAggregatesFilter<"User"> | boolean
    permChangePayment?: BoolWithAggregatesFilter<"User"> | boolean
    permDeleteAudit?: BoolWithAggregatesFilter<"User"> | boolean
    permBulkUpdate?: BoolWithAggregatesFilter<"User"> | boolean
    permBackDateSale?: BoolWithAggregatesFilter<"User"> | boolean
    permViewInsights?: BoolWithAggregatesFilter<"User"> | boolean
    maxDiscount?: FloatWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
    hsn?: StringNullableFilter<"Product"> | string | null
    taxRate?: FloatFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    variants?: ProductVariantListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    hsn?: SortOrderInput | SortOrder
    taxRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    variants?: ProductVariantOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
    hsn?: StringNullableFilter<"Product"> | string | null
    taxRate?: FloatFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    variants?: ProductVariantListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    hsn?: SortOrderInput | SortOrder
    taxRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    hsn?: StringNullableWithAggregatesFilter<"Product"> | string | null
    taxRate?: FloatWithAggregatesFilter<"Product"> | number
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    productId?: StringFilter<"ProductVariant"> | string
    sku?: StringFilter<"ProductVariant"> | string
    barcode?: StringFilter<"ProductVariant"> | string
    size?: StringNullableFilter<"ProductVariant"> | string | null
    color?: StringNullableFilter<"ProductVariant"> | string | null
    mrp?: FloatFilter<"ProductVariant"> | number
    sellingPrice?: FloatFilter<"ProductVariant"> | number
    costPrice?: FloatFilter<"ProductVariant"> | number
    stock?: IntFilter<"ProductVariant"> | number
    minStock?: IntFilter<"ProductVariant"> | number
    isActive?: BoolFilter<"ProductVariant"> | boolean
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    saleItems?: SaleItemListRelationFilter
    inventoryMovements?: InventoryMovementListRelationFilter
  }

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    size?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    saleItems?: SaleItemOrderByRelationAggregateInput
    inventoryMovements?: InventoryMovementOrderByRelationAggregateInput
  }

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    barcode?: string
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    productId?: StringFilter<"ProductVariant"> | string
    size?: StringNullableFilter<"ProductVariant"> | string | null
    color?: StringNullableFilter<"ProductVariant"> | string | null
    mrp?: FloatFilter<"ProductVariant"> | number
    sellingPrice?: FloatFilter<"ProductVariant"> | number
    costPrice?: FloatFilter<"ProductVariant"> | number
    stock?: IntFilter<"ProductVariant"> | number
    minStock?: IntFilter<"ProductVariant"> | number
    isActive?: BoolFilter<"ProductVariant"> | boolean
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    saleItems?: SaleItemListRelationFilter
    inventoryMovements?: InventoryMovementListRelationFilter
  }, "id" | "sku" | "barcode">

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    size?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductVariantCountOrderByAggregateInput
    _avg?: ProductVariantAvgOrderByAggregateInput
    _max?: ProductVariantMaxOrderByAggregateInput
    _min?: ProductVariantMinOrderByAggregateInput
    _sum?: ProductVariantSumOrderByAggregateInput
  }

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    OR?: ProductVariantScalarWhereWithAggregatesInput[]
    NOT?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductVariant"> | string
    productId?: StringWithAggregatesFilter<"ProductVariant"> | string
    sku?: StringWithAggregatesFilter<"ProductVariant"> | string
    barcode?: StringWithAggregatesFilter<"ProductVariant"> | string
    size?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null
    color?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null
    mrp?: FloatWithAggregatesFilter<"ProductVariant"> | number
    sellingPrice?: FloatWithAggregatesFilter<"ProductVariant"> | number
    costPrice?: FloatWithAggregatesFilter<"ProductVariant"> | number
    stock?: IntWithAggregatesFilter<"ProductVariant"> | number
    minStock?: IntWithAggregatesFilter<"ProductVariant"> | number
    isActive?: BoolWithAggregatesFilter<"ProductVariant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    gstin?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    gstin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    gstin?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }, "id" | "phone">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    gstin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    gstin?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    billNo?: IntFilter<"Sale"> | number
    userId?: StringFilter<"Sale"> | string
    customerName?: StringNullableFilter<"Sale"> | string | null
    customerPhone?: StringNullableFilter<"Sale"> | string | null
    subtotal?: FloatFilter<"Sale"> | number
    discount?: FloatFilter<"Sale"> | number
    discountPercent?: FloatFilter<"Sale"> | number
    taxAmount?: FloatFilter<"Sale"> | number
    cgst?: FloatFilter<"Sale"> | number
    sgst?: FloatFilter<"Sale"> | number
    grandTotal?: FloatFilter<"Sale"> | number
    paymentMethod?: StringFilter<"Sale"> | string
    paidAmount?: FloatFilter<"Sale"> | number
    changeAmount?: FloatFilter<"Sale"> | number
    status?: StringFilter<"Sale"> | string
    remarks?: StringNullableFilter<"Sale"> | string | null
    isHistorical?: BoolFilter<"Sale"> | boolean
    importedFrom?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    items?: SaleItemListRelationFilter
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    billNo?: SortOrder
    userId?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paymentMethod?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    isHistorical?: SortOrder
    importedFrom?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: SaleItemOrderByRelationAggregateInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    billNo?: IntFilter<"Sale"> | number
    userId?: StringFilter<"Sale"> | string
    customerName?: StringNullableFilter<"Sale"> | string | null
    customerPhone?: StringNullableFilter<"Sale"> | string | null
    subtotal?: FloatFilter<"Sale"> | number
    discount?: FloatFilter<"Sale"> | number
    discountPercent?: FloatFilter<"Sale"> | number
    taxAmount?: FloatFilter<"Sale"> | number
    cgst?: FloatFilter<"Sale"> | number
    sgst?: FloatFilter<"Sale"> | number
    grandTotal?: FloatFilter<"Sale"> | number
    paymentMethod?: StringFilter<"Sale"> | string
    paidAmount?: FloatFilter<"Sale"> | number
    changeAmount?: FloatFilter<"Sale"> | number
    status?: StringFilter<"Sale"> | string
    remarks?: StringNullableFilter<"Sale"> | string | null
    isHistorical?: BoolFilter<"Sale"> | boolean
    importedFrom?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    items?: SaleItemListRelationFilter
  }, "id">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    billNo?: SortOrder
    userId?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paymentMethod?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    isHistorical?: SortOrder
    importedFrom?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    billNo?: IntWithAggregatesFilter<"Sale"> | number
    userId?: StringWithAggregatesFilter<"Sale"> | string
    customerName?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    subtotal?: FloatWithAggregatesFilter<"Sale"> | number
    discount?: FloatWithAggregatesFilter<"Sale"> | number
    discountPercent?: FloatWithAggregatesFilter<"Sale"> | number
    taxAmount?: FloatWithAggregatesFilter<"Sale"> | number
    cgst?: FloatWithAggregatesFilter<"Sale"> | number
    sgst?: FloatWithAggregatesFilter<"Sale"> | number
    grandTotal?: FloatWithAggregatesFilter<"Sale"> | number
    paymentMethod?: StringWithAggregatesFilter<"Sale"> | string
    paidAmount?: FloatWithAggregatesFilter<"Sale"> | number
    changeAmount?: FloatWithAggregatesFilter<"Sale"> | number
    status?: StringWithAggregatesFilter<"Sale"> | string
    remarks?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    isHistorical?: BoolWithAggregatesFilter<"Sale"> | boolean
    importedFrom?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
  }

  export type SaleItemWhereInput = {
    AND?: SaleItemWhereInput | SaleItemWhereInput[]
    OR?: SaleItemWhereInput[]
    NOT?: SaleItemWhereInput | SaleItemWhereInput[]
    id?: StringFilter<"SaleItem"> | string
    saleId?: StringFilter<"SaleItem"> | string
    variantId?: StringFilter<"SaleItem"> | string
    productName?: StringFilter<"SaleItem"> | string
    variantInfo?: StringNullableFilter<"SaleItem"> | string | null
    quantity?: IntFilter<"SaleItem"> | number
    mrp?: FloatFilter<"SaleItem"> | number
    sellingPrice?: FloatFilter<"SaleItem"> | number
    discount?: FloatFilter<"SaleItem"> | number
    taxRate?: FloatFilter<"SaleItem"> | number
    taxAmount?: FloatFilter<"SaleItem"> | number
    total?: FloatFilter<"SaleItem"> | number
    createdAt?: DateTimeFilter<"SaleItem"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
    variant?: XOR<ProductVariantRelationFilter, ProductVariantWhereInput>
  }

  export type SaleItemOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    variantId?: SortOrder
    productName?: SortOrder
    variantInfo?: SortOrderInput | SortOrder
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    sale?: SaleOrderByWithRelationInput
    variant?: ProductVariantOrderByWithRelationInput
  }

  export type SaleItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleItemWhereInput | SaleItemWhereInput[]
    OR?: SaleItemWhereInput[]
    NOT?: SaleItemWhereInput | SaleItemWhereInput[]
    saleId?: StringFilter<"SaleItem"> | string
    variantId?: StringFilter<"SaleItem"> | string
    productName?: StringFilter<"SaleItem"> | string
    variantInfo?: StringNullableFilter<"SaleItem"> | string | null
    quantity?: IntFilter<"SaleItem"> | number
    mrp?: FloatFilter<"SaleItem"> | number
    sellingPrice?: FloatFilter<"SaleItem"> | number
    discount?: FloatFilter<"SaleItem"> | number
    taxRate?: FloatFilter<"SaleItem"> | number
    taxAmount?: FloatFilter<"SaleItem"> | number
    total?: FloatFilter<"SaleItem"> | number
    createdAt?: DateTimeFilter<"SaleItem"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
    variant?: XOR<ProductVariantRelationFilter, ProductVariantWhereInput>
  }, "id">

  export type SaleItemOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    variantId?: SortOrder
    productName?: SortOrder
    variantInfo?: SortOrderInput | SortOrder
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    _count?: SaleItemCountOrderByAggregateInput
    _avg?: SaleItemAvgOrderByAggregateInput
    _max?: SaleItemMaxOrderByAggregateInput
    _min?: SaleItemMinOrderByAggregateInput
    _sum?: SaleItemSumOrderByAggregateInput
  }

  export type SaleItemScalarWhereWithAggregatesInput = {
    AND?: SaleItemScalarWhereWithAggregatesInput | SaleItemScalarWhereWithAggregatesInput[]
    OR?: SaleItemScalarWhereWithAggregatesInput[]
    NOT?: SaleItemScalarWhereWithAggregatesInput | SaleItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SaleItem"> | string
    saleId?: StringWithAggregatesFilter<"SaleItem"> | string
    variantId?: StringWithAggregatesFilter<"SaleItem"> | string
    productName?: StringWithAggregatesFilter<"SaleItem"> | string
    variantInfo?: StringNullableWithAggregatesFilter<"SaleItem"> | string | null
    quantity?: IntWithAggregatesFilter<"SaleItem"> | number
    mrp?: FloatWithAggregatesFilter<"SaleItem"> | number
    sellingPrice?: FloatWithAggregatesFilter<"SaleItem"> | number
    discount?: FloatWithAggregatesFilter<"SaleItem"> | number
    taxRate?: FloatWithAggregatesFilter<"SaleItem"> | number
    taxAmount?: FloatWithAggregatesFilter<"SaleItem"> | number
    total?: FloatWithAggregatesFilter<"SaleItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SaleItem"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type InventoryMovementWhereInput = {
    AND?: InventoryMovementWhereInput | InventoryMovementWhereInput[]
    OR?: InventoryMovementWhereInput[]
    NOT?: InventoryMovementWhereInput | InventoryMovementWhereInput[]
    id?: StringFilter<"InventoryMovement"> | string
    variantId?: StringFilter<"InventoryMovement"> | string
    type?: StringFilter<"InventoryMovement"> | string
    quantity?: IntFilter<"InventoryMovement"> | number
    reason?: StringNullableFilter<"InventoryMovement"> | string | null
    reference?: StringNullableFilter<"InventoryMovement"> | string | null
    createdBy?: StringFilter<"InventoryMovement"> | string
    createdAt?: DateTimeFilter<"InventoryMovement"> | Date | string
    variant?: XOR<ProductVariantRelationFilter, ProductVariantWhereInput>
  }

  export type InventoryMovementOrderByWithRelationInput = {
    id?: SortOrder
    variantId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    variant?: ProductVariantOrderByWithRelationInput
  }

  export type InventoryMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InventoryMovementWhereInput | InventoryMovementWhereInput[]
    OR?: InventoryMovementWhereInput[]
    NOT?: InventoryMovementWhereInput | InventoryMovementWhereInput[]
    variantId?: StringFilter<"InventoryMovement"> | string
    type?: StringFilter<"InventoryMovement"> | string
    quantity?: IntFilter<"InventoryMovement"> | number
    reason?: StringNullableFilter<"InventoryMovement"> | string | null
    reference?: StringNullableFilter<"InventoryMovement"> | string | null
    createdBy?: StringFilter<"InventoryMovement"> | string
    createdAt?: DateTimeFilter<"InventoryMovement"> | Date | string
    variant?: XOR<ProductVariantRelationFilter, ProductVariantWhereInput>
  }, "id">

  export type InventoryMovementOrderByWithAggregationInput = {
    id?: SortOrder
    variantId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: InventoryMovementCountOrderByAggregateInput
    _avg?: InventoryMovementAvgOrderByAggregateInput
    _max?: InventoryMovementMaxOrderByAggregateInput
    _min?: InventoryMovementMinOrderByAggregateInput
    _sum?: InventoryMovementSumOrderByAggregateInput
  }

  export type InventoryMovementScalarWhereWithAggregatesInput = {
    AND?: InventoryMovementScalarWhereWithAggregatesInput | InventoryMovementScalarWhereWithAggregatesInput[]
    OR?: InventoryMovementScalarWhereWithAggregatesInput[]
    NOT?: InventoryMovementScalarWhereWithAggregatesInput | InventoryMovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InventoryMovement"> | string
    variantId?: StringWithAggregatesFilter<"InventoryMovement"> | string
    type?: StringWithAggregatesFilter<"InventoryMovement"> | string
    quantity?: IntWithAggregatesFilter<"InventoryMovement"> | number
    reason?: StringNullableWithAggregatesFilter<"InventoryMovement"> | string | null
    reference?: StringNullableWithAggregatesFilter<"InventoryMovement"> | string | null
    createdBy?: StringWithAggregatesFilter<"InventoryMovement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InventoryMovement"> | Date | string
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    id?: StringFilter<"Setting"> | string
    key?: StringFilter<"Setting"> | string
    value?: StringFilter<"Setting"> | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: StringFilter<"Setting"> | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "id" | "key">

  export type SettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Setting"> | string
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: StringWithAggregatesFilter<"Setting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type PrinterConfigWhereInput = {
    AND?: PrinterConfigWhereInput | PrinterConfigWhereInput[]
    OR?: PrinterConfigWhereInput[]
    NOT?: PrinterConfigWhereInput | PrinterConfigWhereInput[]
    id?: StringFilter<"PrinterConfig"> | string
    type?: StringFilter<"PrinterConfig"> | string
    printerName?: StringFilter<"PrinterConfig"> | string
    port?: StringNullableFilter<"PrinterConfig"> | string | null
    width?: IntFilter<"PrinterConfig"> | number
    settings?: StringNullableFilter<"PrinterConfig"> | string | null
    isActive?: BoolFilter<"PrinterConfig"> | boolean
    updatedAt?: DateTimeFilter<"PrinterConfig"> | Date | string
  }

  export type PrinterConfigOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    printerName?: SortOrder
    port?: SortOrderInput | SortOrder
    width?: SortOrder
    settings?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrinterConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    type?: string
    AND?: PrinterConfigWhereInput | PrinterConfigWhereInput[]
    OR?: PrinterConfigWhereInput[]
    NOT?: PrinterConfigWhereInput | PrinterConfigWhereInput[]
    printerName?: StringFilter<"PrinterConfig"> | string
    port?: StringNullableFilter<"PrinterConfig"> | string | null
    width?: IntFilter<"PrinterConfig"> | number
    settings?: StringNullableFilter<"PrinterConfig"> | string | null
    isActive?: BoolFilter<"PrinterConfig"> | boolean
    updatedAt?: DateTimeFilter<"PrinterConfig"> | Date | string
  }, "id" | "type">

  export type PrinterConfigOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    printerName?: SortOrder
    port?: SortOrderInput | SortOrder
    width?: SortOrder
    settings?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    _count?: PrinterConfigCountOrderByAggregateInput
    _avg?: PrinterConfigAvgOrderByAggregateInput
    _max?: PrinterConfigMaxOrderByAggregateInput
    _min?: PrinterConfigMinOrderByAggregateInput
    _sum?: PrinterConfigSumOrderByAggregateInput
  }

  export type PrinterConfigScalarWhereWithAggregatesInput = {
    AND?: PrinterConfigScalarWhereWithAggregatesInput | PrinterConfigScalarWhereWithAggregatesInput[]
    OR?: PrinterConfigScalarWhereWithAggregatesInput[]
    NOT?: PrinterConfigScalarWhereWithAggregatesInput | PrinterConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrinterConfig"> | string
    type?: StringWithAggregatesFilter<"PrinterConfig"> | string
    printerName?: StringWithAggregatesFilter<"PrinterConfig"> | string
    port?: StringNullableWithAggregatesFilter<"PrinterConfig"> | string | null
    width?: IntWithAggregatesFilter<"PrinterConfig"> | number
    settings?: StringNullableWithAggregatesFilter<"PrinterConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"PrinterConfig"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"PrinterConfig"> | Date | string
  }

  export type SyncQueueWhereInput = {
    AND?: SyncQueueWhereInput | SyncQueueWhereInput[]
    OR?: SyncQueueWhereInput[]
    NOT?: SyncQueueWhereInput | SyncQueueWhereInput[]
    id?: StringFilter<"SyncQueue"> | string
    action?: StringFilter<"SyncQueue"> | string
    model?: StringFilter<"SyncQueue"> | string
    data?: StringFilter<"SyncQueue"> | string
    status?: StringFilter<"SyncQueue"> | string
    retryCount?: IntFilter<"SyncQueue"> | number
    error?: StringNullableFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeFilter<"SyncQueue"> | Date | string
    updatedAt?: DateTimeFilter<"SyncQueue"> | Date | string
  }

  export type SyncQueueOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    model?: SortOrder
    data?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncQueueWhereInput | SyncQueueWhereInput[]
    OR?: SyncQueueWhereInput[]
    NOT?: SyncQueueWhereInput | SyncQueueWhereInput[]
    action?: StringFilter<"SyncQueue"> | string
    model?: StringFilter<"SyncQueue"> | string
    data?: StringFilter<"SyncQueue"> | string
    status?: StringFilter<"SyncQueue"> | string
    retryCount?: IntFilter<"SyncQueue"> | number
    error?: StringNullableFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeFilter<"SyncQueue"> | Date | string
    updatedAt?: DateTimeFilter<"SyncQueue"> | Date | string
  }, "id">

  export type SyncQueueOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    model?: SortOrder
    data?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SyncQueueCountOrderByAggregateInput
    _avg?: SyncQueueAvgOrderByAggregateInput
    _max?: SyncQueueMaxOrderByAggregateInput
    _min?: SyncQueueMinOrderByAggregateInput
    _sum?: SyncQueueSumOrderByAggregateInput
  }

  export type SyncQueueScalarWhereWithAggregatesInput = {
    AND?: SyncQueueScalarWhereWithAggregatesInput | SyncQueueScalarWhereWithAggregatesInput[]
    OR?: SyncQueueScalarWhereWithAggregatesInput[]
    NOT?: SyncQueueScalarWhereWithAggregatesInput | SyncQueueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncQueue"> | string
    action?: StringWithAggregatesFilter<"SyncQueue"> | string
    model?: StringWithAggregatesFilter<"SyncQueue"> | string
    data?: StringWithAggregatesFilter<"SyncQueue"> | string
    status?: StringWithAggregatesFilter<"SyncQueue"> | string
    retryCount?: IntWithAggregatesFilter<"SyncQueue"> | number
    error?: StringNullableWithAggregatesFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SyncQueue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SyncQueue"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutUserInput
    AuditLog?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutUserInput
    AuditLog?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutUserNestedInput
    AuditLog?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutUserNestedInput
    AuditLog?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    description?: string | null
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    categoryId: string
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    categoryId: string
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantCreateInput = {
    id?: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    saleItems?: SaleItemCreateNestedManyWithoutVariantInput
    inventoryMovements?: InventoryMovementCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateInput = {
    id?: string
    productId: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutVariantInput
    inventoryMovements?: InventoryMovementUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    saleItems?: SaleItemUpdateManyWithoutVariantNestedInput
    inventoryMovements?: InventoryMovementUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleItems?: SaleItemUncheckedUpdateManyWithoutVariantNestedInput
    inventoryMovements?: InventoryMovementUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantCreateManyInput = {
    id?: string
    productId: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    gstin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    gstin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    gstin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateInput = {
    id?: string
    billNo: number
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    billNo: number
    userId: string
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleCreateManyInput = {
    id?: string
    billNo: number
    userId: string
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateInput = {
    id?: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
    sale: SaleCreateNestedOneWithoutItemsInput
    variant: ProductVariantCreateNestedOneWithoutSaleItemsInput
  }

  export type SaleItemUncheckedCreateInput = {
    id?: string
    saleId: string
    variantId: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
  }

  export type SaleItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutItemsNestedInput
    variant?: ProductVariantUpdateOneRequiredWithoutSaleItemsNestedInput
  }

  export type SaleItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateManyInput = {
    id?: string
    saleId: string
    variantId: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
  }

  export type SaleItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    details: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    details: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    details: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryMovementCreateInput = {
    id?: string
    type: string
    quantity: number
    reason?: string | null
    reference?: string | null
    createdBy: string
    createdAt?: Date | string
    variant: ProductVariantCreateNestedOneWithoutInventoryMovementsInput
  }

  export type InventoryMovementUncheckedCreateInput = {
    id?: string
    variantId: string
    type: string
    quantity: number
    reason?: string | null
    reference?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type InventoryMovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variant?: ProductVariantUpdateOneRequiredWithoutInventoryMovementsNestedInput
  }

  export type InventoryMovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryMovementCreateManyInput = {
    id?: string
    variantId: string
    type: string
    quantity: number
    reason?: string | null
    reference?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type InventoryMovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryMovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterConfigCreateInput = {
    id?: string
    type: string
    printerName: string
    port?: string | null
    width: number
    settings?: string | null
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type PrinterConfigUncheckedCreateInput = {
    id?: string
    type: string
    printerName: string
    port?: string | null
    width: number
    settings?: string | null
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type PrinterConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    printerName?: StringFieldUpdateOperationsInput | string
    port?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    printerName?: StringFieldUpdateOperationsInput | string
    port?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterConfigCreateManyInput = {
    id?: string
    type: string
    printerName: string
    port?: string | null
    width: number
    settings?: string | null
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type PrinterConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    printerName?: StringFieldUpdateOperationsInput | string
    port?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    printerName?: StringFieldUpdateOperationsInput | string
    port?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncQueueCreateInput = {
    id?: string
    action?: string
    model: string
    data: string
    status?: string
    retryCount?: number
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncQueueUncheckedCreateInput = {
    id?: string
    action?: string
    model: string
    data: string
    status?: string
    retryCount?: number
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncQueueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncQueueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncQueueCreateManyInput = {
    id?: string
    action?: string
    model: string
    data: string
    status?: string
    retryCount?: number
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncQueueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncQueueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    permPrintSticker?: SortOrder
    permAddItem?: SortOrder
    permDeleteProduct?: SortOrder
    permVoidSale?: SortOrder
    permViewReports?: SortOrder
    permEditSettings?: SortOrder
    permManageProducts?: SortOrder
    permViewSales?: SortOrder
    permViewGstReports?: SortOrder
    permEditSales?: SortOrder
    permManageInventory?: SortOrder
    permManageUsers?: SortOrder
    permViewCostPrice?: SortOrder
    permChangePayment?: SortOrder
    permDeleteAudit?: SortOrder
    permBulkUpdate?: SortOrder
    permBackDateSale?: SortOrder
    permViewInsights?: SortOrder
    maxDiscount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    maxDiscount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    permPrintSticker?: SortOrder
    permAddItem?: SortOrder
    permDeleteProduct?: SortOrder
    permVoidSale?: SortOrder
    permViewReports?: SortOrder
    permEditSettings?: SortOrder
    permManageProducts?: SortOrder
    permViewSales?: SortOrder
    permViewGstReports?: SortOrder
    permEditSales?: SortOrder
    permManageInventory?: SortOrder
    permManageUsers?: SortOrder
    permViewCostPrice?: SortOrder
    permChangePayment?: SortOrder
    permDeleteAudit?: SortOrder
    permBulkUpdate?: SortOrder
    permBackDateSale?: SortOrder
    permViewInsights?: SortOrder
    maxDiscount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    permPrintSticker?: SortOrder
    permAddItem?: SortOrder
    permDeleteProduct?: SortOrder
    permVoidSale?: SortOrder
    permViewReports?: SortOrder
    permEditSettings?: SortOrder
    permManageProducts?: SortOrder
    permViewSales?: SortOrder
    permViewGstReports?: SortOrder
    permEditSales?: SortOrder
    permManageInventory?: SortOrder
    permManageUsers?: SortOrder
    permViewCostPrice?: SortOrder
    permChangePayment?: SortOrder
    permDeleteAudit?: SortOrder
    permBulkUpdate?: SortOrder
    permBackDateSale?: SortOrder
    permViewInsights?: SortOrder
    maxDiscount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    maxDiscount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput
    some?: ProductVariantWhereInput
    none?: ProductVariantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    hsn?: SortOrder
    taxRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    taxRate?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    hsn?: SortOrder
    taxRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    hsn?: SortOrder
    taxRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    taxRate?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type SaleItemListRelationFilter = {
    every?: SaleItemWhereInput
    some?: SaleItemWhereInput
    none?: SaleItemWhereInput
  }

  export type InventoryMovementListRelationFilter = {
    every?: InventoryMovementWhereInput
    some?: InventoryMovementWhereInput
    none?: InventoryMovementWhereInput
  }

  export type SaleItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InventoryMovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    size?: SortOrder
    color?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantAvgOrderByAggregateInput = {
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
  }

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    size?: SortOrder
    color?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    barcode?: SortOrder
    size?: SortOrder
    color?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantSumOrderByAggregateInput = {
    mrp?: SortOrder
    sellingPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    minStock?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    gstin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    gstin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    gstin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    billNo?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paymentMethod?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    isHistorical?: SortOrder
    importedFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    billNo?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    billNo?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paymentMethod?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    isHistorical?: SortOrder
    importedFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    billNo?: SortOrder
    userId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paymentMethod?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    isHistorical?: SortOrder
    importedFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    billNo?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    discountPercent?: SortOrder
    taxAmount?: SortOrder
    cgst?: SortOrder
    sgst?: SortOrder
    grandTotal?: SortOrder
    paidAmount?: SortOrder
    changeAmount?: SortOrder
  }

  export type SaleRelationFilter = {
    is?: SaleWhereInput
    isNot?: SaleWhereInput
  }

  export type ProductVariantRelationFilter = {
    is?: ProductVariantWhereInput
    isNot?: ProductVariantWhereInput
  }

  export type SaleItemCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    variantId?: SortOrder
    productName?: SortOrder
    variantInfo?: SortOrder
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
  }

  export type SaleItemMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    variantId?: SortOrder
    productName?: SortOrder
    variantInfo?: SortOrder
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleItemMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    variantId?: SortOrder
    productName?: SortOrder
    variantInfo?: SortOrder
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    mrp?: SortOrder
    sellingPrice?: SortOrder
    discount?: SortOrder
    taxRate?: SortOrder
    taxAmount?: SortOrder
    total?: SortOrder
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type InventoryMovementCountOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    reference?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type InventoryMovementAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type InventoryMovementMaxOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    reference?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type InventoryMovementMinOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    reference?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type InventoryMovementSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type SettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrinterConfigCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    printerName?: SortOrder
    port?: SortOrder
    width?: SortOrder
    settings?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrinterConfigAvgOrderByAggregateInput = {
    width?: SortOrder
  }

  export type PrinterConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    printerName?: SortOrder
    port?: SortOrder
    width?: SortOrder
    settings?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrinterConfigMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    printerName?: SortOrder
    port?: SortOrder
    width?: SortOrder
    settings?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrinterConfigSumOrderByAggregateInput = {
    width?: SortOrder
  }

  export type SyncQueueCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    model?: SortOrder
    data?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncQueueAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type SyncQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    model?: SortOrder
    data?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncQueueMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    model?: SortOrder
    data?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncQueueSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type SaleCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SaleUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutUserInput | SaleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutUserInput | SaleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutUserInput | SaleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutUserInput | SaleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutUserInput | SaleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutUserInput | SaleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type SaleItemCreateNestedManyWithoutVariantInput = {
    create?: XOR<SaleItemCreateWithoutVariantInput, SaleItemUncheckedCreateWithoutVariantInput> | SaleItemCreateWithoutVariantInput[] | SaleItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutVariantInput | SaleItemCreateOrConnectWithoutVariantInput[]
    createMany?: SaleItemCreateManyVariantInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type InventoryMovementCreateNestedManyWithoutVariantInput = {
    create?: XOR<InventoryMovementCreateWithoutVariantInput, InventoryMovementUncheckedCreateWithoutVariantInput> | InventoryMovementCreateWithoutVariantInput[] | InventoryMovementUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: InventoryMovementCreateOrConnectWithoutVariantInput | InventoryMovementCreateOrConnectWithoutVariantInput[]
    createMany?: InventoryMovementCreateManyVariantInputEnvelope
    connect?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
  }

  export type SaleItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<SaleItemCreateWithoutVariantInput, SaleItemUncheckedCreateWithoutVariantInput> | SaleItemCreateWithoutVariantInput[] | SaleItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutVariantInput | SaleItemCreateOrConnectWithoutVariantInput[]
    createMany?: SaleItemCreateManyVariantInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type InventoryMovementUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<InventoryMovementCreateWithoutVariantInput, InventoryMovementUncheckedCreateWithoutVariantInput> | InventoryMovementCreateWithoutVariantInput[] | InventoryMovementUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: InventoryMovementCreateOrConnectWithoutVariantInput | InventoryMovementCreateOrConnectWithoutVariantInput[]
    createMany?: InventoryMovementCreateManyVariantInputEnvelope
    connect?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type SaleItemUpdateManyWithoutVariantNestedInput = {
    create?: XOR<SaleItemCreateWithoutVariantInput, SaleItemUncheckedCreateWithoutVariantInput> | SaleItemCreateWithoutVariantInput[] | SaleItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutVariantInput | SaleItemCreateOrConnectWithoutVariantInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutVariantInput | SaleItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: SaleItemCreateManyVariantInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutVariantInput | SaleItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutVariantInput | SaleItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type InventoryMovementUpdateManyWithoutVariantNestedInput = {
    create?: XOR<InventoryMovementCreateWithoutVariantInput, InventoryMovementUncheckedCreateWithoutVariantInput> | InventoryMovementCreateWithoutVariantInput[] | InventoryMovementUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: InventoryMovementCreateOrConnectWithoutVariantInput | InventoryMovementCreateOrConnectWithoutVariantInput[]
    upsert?: InventoryMovementUpsertWithWhereUniqueWithoutVariantInput | InventoryMovementUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: InventoryMovementCreateManyVariantInputEnvelope
    set?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    disconnect?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    delete?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    connect?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    update?: InventoryMovementUpdateWithWhereUniqueWithoutVariantInput | InventoryMovementUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: InventoryMovementUpdateManyWithWhereWithoutVariantInput | InventoryMovementUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: InventoryMovementScalarWhereInput | InventoryMovementScalarWhereInput[]
  }

  export type SaleItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<SaleItemCreateWithoutVariantInput, SaleItemUncheckedCreateWithoutVariantInput> | SaleItemCreateWithoutVariantInput[] | SaleItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutVariantInput | SaleItemCreateOrConnectWithoutVariantInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutVariantInput | SaleItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: SaleItemCreateManyVariantInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutVariantInput | SaleItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutVariantInput | SaleItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type InventoryMovementUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<InventoryMovementCreateWithoutVariantInput, InventoryMovementUncheckedCreateWithoutVariantInput> | InventoryMovementCreateWithoutVariantInput[] | InventoryMovementUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: InventoryMovementCreateOrConnectWithoutVariantInput | InventoryMovementCreateOrConnectWithoutVariantInput[]
    upsert?: InventoryMovementUpsertWithWhereUniqueWithoutVariantInput | InventoryMovementUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: InventoryMovementCreateManyVariantInputEnvelope
    set?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    disconnect?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    delete?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    connect?: InventoryMovementWhereUniqueInput | InventoryMovementWhereUniqueInput[]
    update?: InventoryMovementUpdateWithWhereUniqueWithoutVariantInput | InventoryMovementUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: InventoryMovementUpdateManyWithWhereWithoutVariantInput | InventoryMovementUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: InventoryMovementScalarWhereInput | InventoryMovementScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSalesInput = {
    create?: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSalesInput
    connect?: UserWhereUniqueInput
  }

  export type SaleItemCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type SaleItemUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSalesInput
    upsert?: UserUpsertWithoutSalesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSalesInput, UserUpdateWithoutSalesInput>, UserUncheckedUpdateWithoutSalesInput>
  }

  export type SaleItemUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutSaleInput | SaleItemUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutSaleInput | SaleItemUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutSaleInput | SaleItemUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type SaleItemUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutSaleInput | SaleItemUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutSaleInput | SaleItemUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutSaleInput | SaleItemUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type SaleCreateNestedOneWithoutItemsInput = {
    create?: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutItemsInput
    connect?: SaleWhereUniqueInput
  }

  export type ProductVariantCreateNestedOneWithoutSaleItemsInput = {
    create?: XOR<ProductVariantCreateWithoutSaleItemsInput, ProductVariantUncheckedCreateWithoutSaleItemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutSaleItemsInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type SaleUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutItemsInput
    upsert?: SaleUpsertWithoutItemsInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutItemsInput, SaleUpdateWithoutItemsInput>, SaleUncheckedUpdateWithoutItemsInput>
  }

  export type ProductVariantUpdateOneRequiredWithoutSaleItemsNestedInput = {
    create?: XOR<ProductVariantCreateWithoutSaleItemsInput, ProductVariantUncheckedCreateWithoutSaleItemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutSaleItemsInput
    upsert?: ProductVariantUpsertWithoutSaleItemsInput
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutSaleItemsInput, ProductVariantUpdateWithoutSaleItemsInput>, ProductVariantUncheckedUpdateWithoutSaleItemsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogInput = {
    create?: XOR<UserCreateWithoutAuditLogInput, UserUncheckedCreateWithoutAuditLogInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogInput, UserUncheckedCreateWithoutAuditLogInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogInput
    upsert?: UserUpsertWithoutAuditLogInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogInput, UserUpdateWithoutAuditLogInput>, UserUncheckedUpdateWithoutAuditLogInput>
  }

  export type ProductVariantCreateNestedOneWithoutInventoryMovementsInput = {
    create?: XOR<ProductVariantCreateWithoutInventoryMovementsInput, ProductVariantUncheckedCreateWithoutInventoryMovementsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutInventoryMovementsInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type ProductVariantUpdateOneRequiredWithoutInventoryMovementsNestedInput = {
    create?: XOR<ProductVariantCreateWithoutInventoryMovementsInput, ProductVariantUncheckedCreateWithoutInventoryMovementsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutInventoryMovementsInput
    upsert?: ProductVariantUpsertWithoutInventoryMovementsInput
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutInventoryMovementsInput, ProductVariantUpdateWithoutInventoryMovementsInput>, ProductVariantUncheckedUpdateWithoutInventoryMovementsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SaleCreateWithoutUserInput = {
    id?: string
    billNo: number
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SaleItemCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutUserInput = {
    id?: string
    billNo: number
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutUserInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput>
  }

  export type SaleCreateManyUserInputEnvelope = {
    data: SaleCreateManyUserInput | SaleCreateManyUserInput[]
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    details: string
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    details: string
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
  }

  export type SaleUpsertWithWhereUniqueWithoutUserInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutUserInput, SaleUncheckedUpdateWithoutUserInput>
    create: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutUserInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutUserInput, SaleUncheckedUpdateWithoutUserInput>
  }

  export type SaleUpdateManyWithWhereWithoutUserInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutUserInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    billNo?: IntFilter<"Sale"> | number
    userId?: StringFilter<"Sale"> | string
    customerName?: StringNullableFilter<"Sale"> | string | null
    customerPhone?: StringNullableFilter<"Sale"> | string | null
    subtotal?: FloatFilter<"Sale"> | number
    discount?: FloatFilter<"Sale"> | number
    discountPercent?: FloatFilter<"Sale"> | number
    taxAmount?: FloatFilter<"Sale"> | number
    cgst?: FloatFilter<"Sale"> | number
    sgst?: FloatFilter<"Sale"> | number
    grandTotal?: FloatFilter<"Sale"> | number
    paymentMethod?: StringFilter<"Sale"> | string
    paidAmount?: FloatFilter<"Sale"> | number
    changeAmount?: FloatFilter<"Sale"> | number
    status?: StringFilter<"Sale"> | string
    remarks?: StringNullableFilter<"Sale"> | string | null
    isHistorical?: BoolFilter<"Sale"> | boolean
    importedFrom?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
    hsn?: StringNullableFilter<"Product"> | string | null
    taxRate?: FloatFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductVariantCreateWithoutProductInput = {
    id?: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    saleItems?: SaleItemCreateNestedManyWithoutVariantInput
    inventoryMovements?: InventoryMovementCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutVariantInput
    inventoryMovements?: InventoryMovementUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantCreateManyProductInputEnvelope = {
    data: ProductVariantCreateManyProductInput | ProductVariantCreateManyProductInput[]
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    update: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    data: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
  }

  export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariantScalarWhereInput
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    OR?: ProductVariantScalarWhereInput[]
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    productId?: StringFilter<"ProductVariant"> | string
    sku?: StringFilter<"ProductVariant"> | string
    barcode?: StringFilter<"ProductVariant"> | string
    size?: StringNullableFilter<"ProductVariant"> | string | null
    color?: StringNullableFilter<"ProductVariant"> | string | null
    mrp?: FloatFilter<"ProductVariant"> | number
    sellingPrice?: FloatFilter<"ProductVariant"> | number
    costPrice?: FloatFilter<"ProductVariant"> | number
    stock?: IntFilter<"ProductVariant"> | number
    minStock?: IntFilter<"ProductVariant"> | number
    isActive?: BoolFilter<"ProductVariant"> | boolean
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
  }

  export type ProductCreateWithoutVariantsInput = {
    id?: string
    name: string
    description?: string | null
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string
    name: string
    description?: string | null
    categoryId: string
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type SaleItemCreateWithoutVariantInput = {
    id?: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
    sale: SaleCreateNestedOneWithoutItemsInput
  }

  export type SaleItemUncheckedCreateWithoutVariantInput = {
    id?: string
    saleId: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
  }

  export type SaleItemCreateOrConnectWithoutVariantInput = {
    where: SaleItemWhereUniqueInput
    create: XOR<SaleItemCreateWithoutVariantInput, SaleItemUncheckedCreateWithoutVariantInput>
  }

  export type SaleItemCreateManyVariantInputEnvelope = {
    data: SaleItemCreateManyVariantInput | SaleItemCreateManyVariantInput[]
  }

  export type InventoryMovementCreateWithoutVariantInput = {
    id?: string
    type: string
    quantity: number
    reason?: string | null
    reference?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type InventoryMovementUncheckedCreateWithoutVariantInput = {
    id?: string
    type: string
    quantity: number
    reason?: string | null
    reference?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type InventoryMovementCreateOrConnectWithoutVariantInput = {
    where: InventoryMovementWhereUniqueInput
    create: XOR<InventoryMovementCreateWithoutVariantInput, InventoryMovementUncheckedCreateWithoutVariantInput>
  }

  export type InventoryMovementCreateManyVariantInputEnvelope = {
    data: InventoryMovementCreateManyVariantInput | InventoryMovementCreateManyVariantInput[]
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: SaleItemWhereUniqueInput
    update: XOR<SaleItemUpdateWithoutVariantInput, SaleItemUncheckedUpdateWithoutVariantInput>
    create: XOR<SaleItemCreateWithoutVariantInput, SaleItemUncheckedCreateWithoutVariantInput>
  }

  export type SaleItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: SaleItemWhereUniqueInput
    data: XOR<SaleItemUpdateWithoutVariantInput, SaleItemUncheckedUpdateWithoutVariantInput>
  }

  export type SaleItemUpdateManyWithWhereWithoutVariantInput = {
    where: SaleItemScalarWhereInput
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyWithoutVariantInput>
  }

  export type SaleItemScalarWhereInput = {
    AND?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
    OR?: SaleItemScalarWhereInput[]
    NOT?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
    id?: StringFilter<"SaleItem"> | string
    saleId?: StringFilter<"SaleItem"> | string
    variantId?: StringFilter<"SaleItem"> | string
    productName?: StringFilter<"SaleItem"> | string
    variantInfo?: StringNullableFilter<"SaleItem"> | string | null
    quantity?: IntFilter<"SaleItem"> | number
    mrp?: FloatFilter<"SaleItem"> | number
    sellingPrice?: FloatFilter<"SaleItem"> | number
    discount?: FloatFilter<"SaleItem"> | number
    taxRate?: FloatFilter<"SaleItem"> | number
    taxAmount?: FloatFilter<"SaleItem"> | number
    total?: FloatFilter<"SaleItem"> | number
    createdAt?: DateTimeFilter<"SaleItem"> | Date | string
  }

  export type InventoryMovementUpsertWithWhereUniqueWithoutVariantInput = {
    where: InventoryMovementWhereUniqueInput
    update: XOR<InventoryMovementUpdateWithoutVariantInput, InventoryMovementUncheckedUpdateWithoutVariantInput>
    create: XOR<InventoryMovementCreateWithoutVariantInput, InventoryMovementUncheckedCreateWithoutVariantInput>
  }

  export type InventoryMovementUpdateWithWhereUniqueWithoutVariantInput = {
    where: InventoryMovementWhereUniqueInput
    data: XOR<InventoryMovementUpdateWithoutVariantInput, InventoryMovementUncheckedUpdateWithoutVariantInput>
  }

  export type InventoryMovementUpdateManyWithWhereWithoutVariantInput = {
    where: InventoryMovementScalarWhereInput
    data: XOR<InventoryMovementUpdateManyMutationInput, InventoryMovementUncheckedUpdateManyWithoutVariantInput>
  }

  export type InventoryMovementScalarWhereInput = {
    AND?: InventoryMovementScalarWhereInput | InventoryMovementScalarWhereInput[]
    OR?: InventoryMovementScalarWhereInput[]
    NOT?: InventoryMovementScalarWhereInput | InventoryMovementScalarWhereInput[]
    id?: StringFilter<"InventoryMovement"> | string
    variantId?: StringFilter<"InventoryMovement"> | string
    type?: StringFilter<"InventoryMovement"> | string
    quantity?: IntFilter<"InventoryMovement"> | number
    reason?: StringNullableFilter<"InventoryMovement"> | string | null
    reference?: StringNullableFilter<"InventoryMovement"> | string | null
    createdBy?: StringFilter<"InventoryMovement"> | string
    createdAt?: DateTimeFilter<"InventoryMovement"> | Date | string
  }

  export type UserCreateWithoutSalesInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    AuditLog?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSalesInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    AuditLog?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSalesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
  }

  export type SaleItemCreateWithoutSaleInput = {
    id?: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
    variant: ProductVariantCreateNestedOneWithoutSaleItemsInput
  }

  export type SaleItemUncheckedCreateWithoutSaleInput = {
    id?: string
    variantId: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
  }

  export type SaleItemCreateOrConnectWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    create: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput>
  }

  export type SaleItemCreateManySaleInputEnvelope = {
    data: SaleItemCreateManySaleInput | SaleItemCreateManySaleInput[]
  }

  export type UserUpsertWithoutSalesInput = {
    update: XOR<UserUpdateWithoutSalesInput, UserUncheckedUpdateWithoutSalesInput>
    create: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSalesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSalesInput, UserUncheckedUpdateWithoutSalesInput>
  }

  export type UserUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AuditLog?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AuditLog?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleItemUpsertWithWhereUniqueWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    update: XOR<SaleItemUpdateWithoutSaleInput, SaleItemUncheckedUpdateWithoutSaleInput>
    create: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput>
  }

  export type SaleItemUpdateWithWhereUniqueWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    data: XOR<SaleItemUpdateWithoutSaleInput, SaleItemUncheckedUpdateWithoutSaleInput>
  }

  export type SaleItemUpdateManyWithWhereWithoutSaleInput = {
    where: SaleItemScalarWhereInput
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyWithoutSaleInput>
  }

  export type SaleCreateWithoutItemsInput = {
    id?: string
    billNo: number
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutItemsInput = {
    id?: string
    billNo: number
    userId: string
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleCreateOrConnectWithoutItemsInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
  }

  export type ProductVariantCreateWithoutSaleItemsInput = {
    id?: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    inventoryMovements?: InventoryMovementCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutSaleItemsInput = {
    id?: string
    productId: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inventoryMovements?: InventoryMovementUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutSaleItemsInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutSaleItemsInput, ProductVariantUncheckedCreateWithoutSaleItemsInput>
  }

  export type SaleUpsertWithoutItemsInput = {
    update: XOR<SaleUpdateWithoutItemsInput, SaleUncheckedUpdateWithoutItemsInput>
    create: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutItemsInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutItemsInput, SaleUncheckedUpdateWithoutItemsInput>
  }

  export type SaleUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantUpsertWithoutSaleItemsInput = {
    update: XOR<ProductVariantUpdateWithoutSaleItemsInput, ProductVariantUncheckedUpdateWithoutSaleItemsInput>
    create: XOR<ProductVariantCreateWithoutSaleItemsInput, ProductVariantUncheckedCreateWithoutSaleItemsInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutSaleItemsInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutSaleItemsInput, ProductVariantUncheckedUpdateWithoutSaleItemsInput>
  }

  export type ProductVariantUpdateWithoutSaleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    inventoryMovements?: InventoryMovementUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutSaleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventoryMovements?: InventoryMovementUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type UserCreateWithoutAuditLogInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogInput = {
    id?: string
    username: string
    password: string
    name: string
    role: string
    isActive?: boolean
    permPrintSticker?: boolean
    permAddItem?: boolean
    permDeleteProduct?: boolean
    permVoidSale?: boolean
    permViewReports?: boolean
    permEditSettings?: boolean
    permManageProducts?: boolean
    permViewSales?: boolean
    permViewGstReports?: boolean
    permEditSales?: boolean
    permManageInventory?: boolean
    permManageUsers?: boolean
    permViewCostPrice?: boolean
    permChangePayment?: boolean
    permDeleteAudit?: boolean
    permBulkUpdate?: boolean
    permBackDateSale?: boolean
    permViewInsights?: boolean
    maxDiscount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogInput, UserUncheckedCreateWithoutAuditLogInput>
  }

  export type UserUpsertWithoutAuditLogInput = {
    update: XOR<UserUpdateWithoutAuditLogInput, UserUncheckedUpdateWithoutAuditLogInput>
    create: XOR<UserCreateWithoutAuditLogInput, UserUncheckedCreateWithoutAuditLogInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogInput, UserUncheckedUpdateWithoutAuditLogInput>
  }

  export type UserUpdateWithoutAuditLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permPrintSticker?: BoolFieldUpdateOperationsInput | boolean
    permAddItem?: BoolFieldUpdateOperationsInput | boolean
    permDeleteProduct?: BoolFieldUpdateOperationsInput | boolean
    permVoidSale?: BoolFieldUpdateOperationsInput | boolean
    permViewReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSettings?: BoolFieldUpdateOperationsInput | boolean
    permManageProducts?: BoolFieldUpdateOperationsInput | boolean
    permViewSales?: BoolFieldUpdateOperationsInput | boolean
    permViewGstReports?: BoolFieldUpdateOperationsInput | boolean
    permEditSales?: BoolFieldUpdateOperationsInput | boolean
    permManageInventory?: BoolFieldUpdateOperationsInput | boolean
    permManageUsers?: BoolFieldUpdateOperationsInput | boolean
    permViewCostPrice?: BoolFieldUpdateOperationsInput | boolean
    permChangePayment?: BoolFieldUpdateOperationsInput | boolean
    permDeleteAudit?: BoolFieldUpdateOperationsInput | boolean
    permBulkUpdate?: BoolFieldUpdateOperationsInput | boolean
    permBackDateSale?: BoolFieldUpdateOperationsInput | boolean
    permViewInsights?: BoolFieldUpdateOperationsInput | boolean
    maxDiscount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductVariantCreateWithoutInventoryMovementsInput = {
    id?: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    saleItems?: SaleItemCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutInventoryMovementsInput = {
    id?: string
    productId: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutInventoryMovementsInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutInventoryMovementsInput, ProductVariantUncheckedCreateWithoutInventoryMovementsInput>
  }

  export type ProductVariantUpsertWithoutInventoryMovementsInput = {
    update: XOR<ProductVariantUpdateWithoutInventoryMovementsInput, ProductVariantUncheckedUpdateWithoutInventoryMovementsInput>
    create: XOR<ProductVariantCreateWithoutInventoryMovementsInput, ProductVariantUncheckedCreateWithoutInventoryMovementsInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutInventoryMovementsInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutInventoryMovementsInput, ProductVariantUncheckedUpdateWithoutInventoryMovementsInput>
  }

  export type ProductVariantUpdateWithoutInventoryMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    saleItems?: SaleItemUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutInventoryMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleItems?: SaleItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type SaleCreateManyUserInput = {
    id?: string
    billNo: number
    customerName?: string | null
    customerPhone?: string | null
    subtotal: number
    discount?: number
    discountPercent?: number
    taxAmount: number
    cgst: number
    sgst: number
    grandTotal: number
    paymentMethod?: string
    paidAmount: number
    changeAmount: number
    status?: string
    remarks?: string | null
    isHistorical?: boolean
    importedFrom?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    details: string
    createdAt?: Date | string
  }

  export type SaleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNo?: IntFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    discountPercent?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    cgst?: FloatFieldUpdateOperationsInput | number
    sgst?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paidAmount?: FloatFieldUpdateOperationsInput | number
    changeAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    isHistorical?: BoolFieldUpdateOperationsInput | boolean
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    description?: string | null
    hsn?: string | null
    taxRate?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hsn?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantCreateManyProductInput = {
    id?: string
    sku: string
    barcode: string
    size?: string | null
    color?: string | null
    mrp: number
    sellingPrice: number
    costPrice: number
    stock?: number
    minStock?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductVariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleItems?: SaleItemUpdateManyWithoutVariantNestedInput
    inventoryMovements?: InventoryMovementUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleItems?: SaleItemUncheckedUpdateManyWithoutVariantNestedInput
    inventoryMovements?: InventoryMovementUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    minStock?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateManyVariantInput = {
    id?: string
    saleId: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
  }

  export type InventoryMovementCreateManyVariantInput = {
    id?: string
    type: string
    quantity: number
    reason?: string | null
    reference?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type SaleItemUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutItemsNestedInput
  }

  export type SaleItemUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryMovementUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryMovementUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryMovementUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateManySaleInput = {
    id?: string
    variantId: string
    productName: string
    variantInfo?: string | null
    quantity: number
    mrp: number
    sellingPrice: number
    discount?: number
    taxRate: number
    taxAmount: number
    total: number
    createdAt?: Date | string
  }

  export type SaleItemUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variant?: ProductVariantUpdateOneRequiredWithoutSaleItemsNestedInput
  }

  export type SaleItemUncheckedUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUncheckedUpdateManyWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    variantInfo?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    mrp?: FloatFieldUpdateOperationsInput | number
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductVariantCountOutputTypeDefaultArgs instead
     */
    export type ProductVariantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleCountOutputTypeDefaultArgs instead
     */
    export type SaleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductVariantDefaultArgs instead
     */
    export type ProductVariantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductVariantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleDefaultArgs instead
     */
    export type SaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleItemDefaultArgs instead
     */
    export type SaleItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InventoryMovementDefaultArgs instead
     */
    export type InventoryMovementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InventoryMovementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingDefaultArgs instead
     */
    export type SettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PrinterConfigDefaultArgs instead
     */
    export type PrinterConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PrinterConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SyncQueueDefaultArgs instead
     */
    export type SyncQueueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SyncQueueDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}