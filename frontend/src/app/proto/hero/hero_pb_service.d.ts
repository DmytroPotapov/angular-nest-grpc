// package: hero
// file: hero/hero.proto

import * as hero_hero_pb from "../hero/hero_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HeroServiceFindOne = {
  readonly methodName: string;
  readonly service: typeof HeroService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof hero_hero_pb.HeroById;
  readonly responseType: typeof hero_hero_pb.Hero;
};

type HeroServiceQueryHeroes = {
  readonly methodName: string;
  readonly service: typeof HeroService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof hero_hero_pb.QueryHeroesRequest;
  readonly responseType: typeof hero_hero_pb.Hero;
};

export class HeroService {
  static readonly serviceName: string;
  static readonly FindOne: HeroServiceFindOne;
  static readonly QueryHeroes: HeroServiceQueryHeroes;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HeroServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  findOne(
    requestMessage: hero_hero_pb.HeroById,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: hero_hero_pb.Hero|null) => void
  ): UnaryResponse;
  findOne(
    requestMessage: hero_hero_pb.HeroById,
    callback: (error: ServiceError|null, responseMessage: hero_hero_pb.Hero|null) => void
  ): UnaryResponse;
  queryHeroes(requestMessage: hero_hero_pb.QueryHeroesRequest, metadata?: grpc.Metadata): ResponseStream<hero_hero_pb.Hero>;
}

