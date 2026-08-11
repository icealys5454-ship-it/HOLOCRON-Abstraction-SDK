<p style="text-align: center;">
  <img src="holocron-logo.jpg" width="128" alt="HOLOCRON logo">

# HOLOCRON Emulator SDK
</p>

A GitHub-ready abstraction layer for wiring a CMS game library to a versioned
WebAssembly/WebGL emulator core.

This repository separates the emulator into three concerns:

1. **Abstract contracts** — stable host/core and connector interfaces.
2. **Wired connectors** — core ABI, video, gamepad, and save-state storage adapters.
3. **Sorted filters** — deterministic query/sort/filter pipelines for CMS game libraries.

The package is designed around the HOLOCRON stable SNES core ABI `1.x`.
It does **not** bundle commercial ROMs.

## Architecture

```text
CMS game library
      |
      v
FilterPipeline
(query -> metadata -> compatibility -> sort)
      |
      v
HolocronRuntime
  |       |       |
  v       v       v
Core     Video   Input
ABI      Canvas  Gamepad
  |
  v
WASM emulator core
```

## Repository layout

```text
src/
  abstract/
    Connector.ts
    EmulatorCore.ts
    Filter.ts
  connectors/
    CoreAbiConnector.ts
    GamepadConnector.ts
    StateStorageConnector.ts
    WebGLConnector.ts
  filters/
    FilterPipeline.ts
    QueryFilter.ts
    SortFilter.ts
  runtime/
    HolocronRuntime.ts
  types/
examples/browser/
tests/
docs/
.github/workflows/
```

## Quick start

```bash
npm install
npm run check
```

Use the stable ABI connector:

```ts
import { CoreAbiConnector } from "./src/index.js";

const core = new CoreAbiConnector();
await core.open("/cores/snes43_core.wasm");

const rom = new Uint8Array(await (await fetch("/roms/homebrew.sfc")).arrayBuffer());
core.loadRom(rom);
core.runFrame();

const frame = core.getFramebuffer();
console.log(frame.width, frame.height);
```

Wire the browser runtime:

```ts
import {
  CoreAbiConnector,
  GamepadConnector,
  HolocronRuntime,
  WebGLConnector,
} from "./src/index.js";

const core = new CoreAbiConnector();
await core.open("/cores/snes43_core.wasm");

const video = new WebGLConnector();
video.connect(document.querySelector("#screen"));

const runtime = new HolocronRuntime(core, video, new GamepadConnector());

runtime.start({
  deadzone: 0.18,
  bindings: {
    B: 0,
    A: 1,
    Y: 2,
    X: 3,
    L: 4,
    R: 5,
    Select: 8,
    Start: 9,
  },
});
```

## Sorted CMS filters

Filters implement an abstract `Filter<T>` contract and are sorted by
`order`, then `id`, before execution. That keeps the same filter behavior
across the CMS, browser launcher, tests, and compatibility tooling.

```ts
const pipeline = new FilterPipeline<Game>()
  .use(new QueryFilter(game => game.title))
  .use(new SortFilter(game => game.title));

const result = pipeline.run({
  items: games,
  query: "rpg",
});
```

Recommended ordering bands:

| Range | Purpose |
|---|---|
| 0–99 | security / entitlement |
| 100–199 | text query |
| 200–399 | metadata / platform |
| 400–599 | compatibility |
| 600–799 | user preferences |
| 800–899 | grouping |
| 900–999 | final sorting |

## Stable ABI expectation

`CoreAbiConnector` expects the core to expose the HOLOCRON ABI v1 surface:
semantic version functions, ROM upload arena, `reset`, `run_frame`,
RGBA8888 framebuffer access, controller register input, S16 stereo audio,
and save/load state buffers.

The host rejects unsupported ABI major versions instead of guessing.

## GitHub workflow

`.github/workflows/ci.yml` runs TypeScript checks on pushes and pull requests.
The repository also includes contribution, security, and issue templates.

## Legal / ROM policy

This SDK contains no commercial game ROMs. Use homebrew/public test ROMs or
cartridge dumps you are legally entitled to use.

## Current core status

The surrounding CMS/runtime architecture can be production engineered
independently from emulator accuracy. The current SNES core remains a
development implementation until CPU, PPU, DMA/HDMA, controller, APU/DSP,
mapping, timing, and compatibility coverage are fully qualified.

## License

MIT. See [LICENSE](LICENSE).
