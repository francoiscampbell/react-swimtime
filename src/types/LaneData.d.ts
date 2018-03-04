export interface SublaneData {
	start: Date,
	end: Date,
	[x: string]: any
}

export type LaneData = SublaneData | SublaneData[]