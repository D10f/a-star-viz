import Hexagon from './Hexagon';

export type HexagonRelativePosition =
    'RIGHT'
    | 'TOP_RIGHT'
    | 'TOP_LEFT'
    | 'LEFT'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT';

export type HexagonLookupTable = {
    [key in HexagonRelativePosition]: number[][]
}

export type HexagonProps = {
    x: number;
    y: number;
    size?: number;
    color?: string;
    image?: string;
    imageAngle?: number;
    col?: number;
    row?: number;
    id?: string;
};

export type TerrainProps = HexagonProps & {
    terrainType: TerrainType;
};

export type EventCallback = (data?: any) => void;

export type TerrainType =
    'DESERT'
    | 'GRASS'
    | 'MOUNTAIN'
    | 'ORE'
    | 'WATER'
    | 'WHEAT'
    | 'WOOD';

export type FlagType =
'START'
| 'END';

export type TerrainTypeImageTable = {
    [key in TerrainType]: string;
};

export type TerrainTypeDifficultyTable = {
    [key in TerrainType]: number;
};

export type FlagTypeImageTable = {
    [key in FlagType]: string;
};

export type CursorEvent = {
    cursor: Hexagon;
    tile: TerrainType | FlagType | null;
}
