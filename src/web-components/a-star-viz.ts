import Canvas from "../Canvas";
import { ENDPOINT_TOKEN_IMG_TABLE, TERRAIN_TYPE_DIFFICULTY_TABLE, TERRAIN_TYPE_IMG_TABLE } from "../defs";
import { FlagType, TerrainType } from "../types";
import playImg from '../assets/play.png';
import pauseImg from '../assets/pause.png';
import speedQuarter from '../assets/speed-quarter.png';
import speedHalf from "../assets/speed-half.png"
import speedThreeQuarters from "../assets/speed-three-quarters.png";
import speedOne from "../assets/speed-one.png";

export default class AStarVisualization extends HTMLElement {

    private tilePicker: HTMLElement | null;
    private tileButtons: HTMLButtonElement[];
    private actionButtons: HTMLButtonElement[];
    private playbackButtons: HTMLButtonElement[];
    private canvas: Canvas | null;

    constructor() {
        super();
        this.tilePicker = null;
        this.tileButtons = [];
        this.actionButtons = [];
        this.playbackButtons = [];
        this.canvas = null;

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    attachEvents() {
        this.tilePicker!.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;

            if (target.nodeName !== 'BUTTON') return;

            if (target.hasAttribute('type')) {
                this.toggleActiveButton(this.tileButtons, target);
                this.canvas!.cursor.setTile(target.getAttribute('type') as TerrainType | FlagType);
            } else if (target.hasAttribute('action')) {
                this.toggleActiveButton(this.actionButtons, target);
                this.canvas!.emitter.emit(target.getAttribute('action') as string);
            } else if (target.hasAttribute('speed')) {
                this.toggleActiveButton(this.playbackButtons, target);
                this.canvas!.emitter.emit('playbackSpeed', parseFloat(target.getAttribute('speed') as string));
            }

        });
    }

    toggleActiveButton(buttons: HTMLButtonElement[], active: HTMLButtonElement) {
        buttons.forEach(btn => {
            if (btn === active) {
                active.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    get styles() {
        const stylesHtml = `
            <style>
                :host {
                    display: block;
                }
                .row {
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                    overflow: scroll;
                }
                button {
                    filter: grayscale(1);
                    border: none;
                    background: none;
                }
                button:hover {
                    filter: grayscale(0);
                    cursor: pointer;
                    background-color: rgba(255,255,255,0.25);
                }
                button.active {
                    filter: grayscale(0);
                    background-color: rgba(255,255,255,0.25);
                }
                img {
                    pointer-events: none;
                }
            </style>
        `;

        return stylesHtml;
    }

    render() {
        const shadowRoot = this.shadowRoot as ShadowRoot;

        shadowRoot.innerHTML = `
            ${this.styles}
            <section class="tile-picker">

                <h3>Terrain:</h3>
                <div class="row" slot="terrainTiles">
                    ${
                        Object.entries(TERRAIN_TYPE_IMG_TABLE)
                            .sort(([ a ], [ b ]) => (
                    //@ts-ignore
                                TERRAIN_TYPE_DIFFICULTY_TABLE[a] > TERRAIN_TYPE_DIFFICULTY_TABLE[b]
                                    ? 1
                                    : -1
                            ))
                            .map(([ terrain, img ]) => `
                                <button type="${terrain}" layer"">
                                    <img src="${img}">
                                </button>
                            `)
                            .join('\n')
                    }
                </div>

                <h3>Start/Target:</h3>
                <div class="row" slot="flagTiles">
                    ${Object.entries(ENDPOINT_TOKEN_IMG_TABLE).map(([ flag, img]) => `
                        <button type="${flag}" layer"">
                            <img src="${img}">
                        </button>
                    `).join('\n')}
                </div>

                <h3>Player Controls:</h3>
                <div class="row" slot="actionTiles">
                    <button action="play">
                        <img src="${playImg}" >
                    </button>
                    <button action="pause">
                        <img src="${pauseImg}">
                    </button>
                    <button speed="0.25">
                        <img src="${speedQuarter}">
                    </button>
                    <button speed="0.5">
                        <img src="${speedHalf}">
                    </button>
                    <button speed="0.75">
                        <img src="${speedThreeQuarters}">
                    </button>
                    <button class="active" speed="1">
                        <img src="${speedOne}">
                    </button>
                </div>
            </section>
            <canvas id="pathfinding" width="800" height="600"></canvas>
        `;

        this.tilePicker = shadowRoot.querySelector('.tile-picker') as HTMLElement;
        this.tileButtons = Array.from(shadowRoot.querySelectorAll('button[type]')) as HTMLButtonElement[];
        this.actionButtons = Array.from(shadowRoot.querySelectorAll('button[action]')) as HTMLButtonElement[];
        this.playbackButtons = Array.from(shadowRoot.querySelectorAll('button[speed]')) as HTMLButtonElement[];

        const canvasEl = shadowRoot.getElementById('pathfinding') as HTMLCanvasElement;
        canvasEl.width = 800;
        canvasEl.height = 600;

        this.canvas = new Canvas(canvasEl);
        this.canvas.init();

        this.attachEvents();
    }
}

customElements.define('a-star-viz', AStarVisualization);
