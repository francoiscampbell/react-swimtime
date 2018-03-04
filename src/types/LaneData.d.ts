interface SublaneTimeData {
	start: Date,
	end: Date
}

export type SublaneData = SublaneTimeData & SublaneExtraData

export interface SublaneExtraData {
	[x: string]: any
}


export type LaneData = SublaneData | SublaneData[]