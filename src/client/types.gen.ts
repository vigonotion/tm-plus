/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Corporations = "corporations",
	Games = "games",
	Groups = "groups",
	Placements = "placements",
	Players = "players",
	Users = "users",
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

export type CorporationsRecord = {
	ability?: HTMLString
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

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CorporationsResponse<Texpand = unknown> = Required<CorporationsRecord> & BaseSystemFields<Texpand>
export type GamesResponse<Texpand = unknown> = Required<GamesRecord> & BaseSystemFields<Texpand>
export type GroupsResponse<Texpand = unknown> = Required<GroupsRecord> & BaseSystemFields<Texpand>
export type PlacementsResponse<Texpand = unknown> = Required<PlacementsRecord> & BaseSystemFields<Texpand>
export type PlayersResponse<Texpand = unknown> = Required<PlayersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	corporations: CorporationsRecord
	games: GamesRecord
	groups: GroupsRecord
	placements: PlacementsRecord
	players: PlayersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	corporations: CorporationsResponse
	games: GamesResponse
	groups: GroupsResponse
	placements: PlacementsResponse
	players: PlayersResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'corporations'): RecordService<CorporationsResponse>
	collection(idOrName: 'games'): RecordService<GamesResponse>
	collection(idOrName: 'groups'): RecordService<GroupsResponse>
	collection(idOrName: 'placements'): RecordService<PlacementsResponse>
	collection(idOrName: 'players'): RecordService<PlayersResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
