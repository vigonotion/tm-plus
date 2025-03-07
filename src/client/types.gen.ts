/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Awards = "awards",
	AwardsUnlocked = "awards_unlocked",
	Corporations = "corporations",
	Games = "games",
	Groups = "groups",
	Milestones = "milestones",
	MilestonesUnlocked = "milestones_unlocked",
	Placements = "placements",
	Players = "players",
	PlaysPerMap = "plays_per_map",
	Tierlists = "tierlists",
	Users = "users",
	Wins = "wins",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum AwardsOriginOptions {
	"mars" = "mars",
	"hellas" = "hellas",
	"elysium" = "elysium",
	"venus" = "venus",
}
export type AwardsRecord = {
	name?: string
	note?: string
	origin?: AwardsOriginOptions
}

export type AwardsUnlockedRecord = {
	award?: RecordIdString
	game?: RecordIdString
	player?: RecordIdString
	second?: RecordIdString[]
	winner?: RecordIdString[]
}

export type CorporationsRecord = {
	ability?: HTMLString
	custom?: boolean
	description?: HTMLString
	logo?: HTMLString
	logo_svg?: string
	name?: string
}

export enum GamesMapOptions {
	"mars" = "mars",
	"hellas" = "hellas",
	"elysium" = "elysium",
	"amazonis" = "amazonis",
	"terra" = "terra",
	"utopia" = "utopia",
	"vastitas" = "vastitas",
}
export type GamesRecord = {
	date: IsoDateString
	duration_in_minutes?: number
	generations?: number
	group?: RecordIdString
	map?: GamesMapOptions
	map_state?: string
	name?: string
	notes?: HTMLString
	planned?: boolean
}

export type GroupsRecord = {
	name?: string
	players?: RecordIdString[]
}

export enum MilestonesOriginOptions {
	"mars" = "mars",
	"hellas" = "hellas",
	"elysium" = "elysium",
	"venus" = "venus",
}
export type MilestonesRecord = {
	name?: string
	note?: string
	origin?: MilestonesOriginOptions
}

export type MilestonesUnlockedRecord = {
	game?: RecordIdString
	milestone?: RecordIdString
	player?: RecordIdString
}

export enum PlacementsColorOptions {
	"red" = "red",
	"green" = "green",
	"blue" = "blue",
	"yellow" = "yellow",
	"black" = "black",
}
export type PlacementsRecord = {
	color?: PlacementsColorOptions
	corp?: RecordIdString
	game?: RecordIdString
	placement?: number
	player?: RecordIdString
	politics_tw?: number
	score?: number
	tw?: number
}

export enum PlayersDefaultColorOptions {
	"black" = "black",
	"blue" = "blue",
	"red" = "red",
	"green" = "green",
	"yellow" = "yellow",
}
export type PlayersRecord = {
	default_color?: PlayersDefaultColorOptions
	name?: string
}

export enum PlaysPerMapMapOptions {
	"mars" = "mars",
	"hellas" = "hellas",
	"elysium" = "elysium",
	"amazonis" = "amazonis",
	"terra" = "terra",
	"utopia" = "utopia",
	"vastitas" = "vastitas",
}
export type PlaysPerMapRecord<Tavg_generations = unknown> = {
	avg_generations?: null | Tavg_generations
	map?: PlaysPerMapMapOptions
	num_games?: number
}

export type TierlistsRecord = {
	player?: RecordIdString
	tier_a?: RecordIdString[]
	tier_b?: RecordIdString[]
	tier_c?: RecordIdString[]
	tier_d?: RecordIdString[]
	tier_s?: RecordIdString[]
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type WinsRecord = {
	name?: string
	placement?: number
}

// Response types include system fields and match responses from the PocketBase API
export type AwardsResponse<Texpand = unknown> = Required<AwardsRecord> & BaseSystemFields<Texpand>
export type AwardsUnlockedResponse<Texpand = unknown> = Required<AwardsUnlockedRecord> & BaseSystemFields<Texpand>
export type CorporationsResponse<Texpand = unknown> = Required<CorporationsRecord> & BaseSystemFields<Texpand>
export type GamesResponse<Texpand = unknown> = Required<GamesRecord> & BaseSystemFields<Texpand>
export type GroupsResponse<Texpand = unknown> = Required<GroupsRecord> & BaseSystemFields<Texpand>
export type MilestonesResponse<Texpand = unknown> = Required<MilestonesRecord> & BaseSystemFields<Texpand>
export type MilestonesUnlockedResponse<Texpand = unknown> = Required<MilestonesUnlockedRecord> & BaseSystemFields<Texpand>
export type PlacementsResponse<Texpand = unknown> = Required<PlacementsRecord> & BaseSystemFields<Texpand>
export type PlayersResponse<Texpand = unknown> = Required<PlayersRecord> & BaseSystemFields<Texpand>
export type PlaysPerMapResponse<Tavg_generations = unknown, Texpand = unknown> = Required<PlaysPerMapRecord<Tavg_generations>> & BaseSystemFields<Texpand>
export type TierlistsResponse<Texpand = unknown> = Required<TierlistsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WinsResponse<Texpand = unknown> = Required<WinsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	awards: AwardsRecord
	awards_unlocked: AwardsUnlockedRecord
	corporations: CorporationsRecord
	games: GamesRecord
	groups: GroupsRecord
	milestones: MilestonesRecord
	milestones_unlocked: MilestonesUnlockedRecord
	placements: PlacementsRecord
	players: PlayersRecord
	plays_per_map: PlaysPerMapRecord
	tierlists: TierlistsRecord
	users: UsersRecord
	wins: WinsRecord
}

export type CollectionResponses = {
	awards: AwardsResponse
	awards_unlocked: AwardsUnlockedResponse
	corporations: CorporationsResponse
	games: GamesResponse
	groups: GroupsResponse
	milestones: MilestonesResponse
	milestones_unlocked: MilestonesUnlockedResponse
	placements: PlacementsResponse
	players: PlayersResponse
	plays_per_map: PlaysPerMapResponse
	tierlists: TierlistsResponse
	users: UsersResponse
	wins: WinsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'awards'): RecordService<AwardsResponse>
	collection(idOrName: 'awards_unlocked'): RecordService<AwardsUnlockedResponse>
	collection(idOrName: 'corporations'): RecordService<CorporationsResponse>
	collection(idOrName: 'games'): RecordService<GamesResponse>
	collection(idOrName: 'groups'): RecordService<GroupsResponse>
	collection(idOrName: 'milestones'): RecordService<MilestonesResponse>
	collection(idOrName: 'milestones_unlocked'): RecordService<MilestonesUnlockedResponse>
	collection(idOrName: 'placements'): RecordService<PlacementsResponse>
	collection(idOrName: 'players'): RecordService<PlayersResponse>
	collection(idOrName: 'plays_per_map'): RecordService<PlaysPerMapResponse>
	collection(idOrName: 'tierlists'): RecordService<TierlistsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'wins'): RecordService<WinsResponse>
}
