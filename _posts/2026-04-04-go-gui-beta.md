---
layout: post
title: 'go-gui: A New GUI Framework for Go'
---

[go-gui](https://github.com/mike-ward/go-gui) is now in beta and ready for use.

![go-gui showcase](https://raw.githubusercontent.com/mike-ward/go-gui/main/assets/showcase.png)

## What it is

An immediate-mode GUI framework for Go. Every frame, a plain Go function returns a layout tree that gets sized, positioned, and rendered directly to the GPU. No virtual DOM. No diffing. No hidden magic. State lives in a single typed slot per window.

```
View fn → Layout tree → layoutArrange() → renderLayout() → []RenderCmd → GPU
```

## Why it's fast

- GPU-accelerated via SDL2 + Metal (macOS) and OpenGL (Linux/Windows)
- Web/WASM backend with WebGL shaders — runs in any browser
- iOS (Metal) and Android backends included
- No allocations per frame in the hot path

## What's included

**50+ widgets** — buttons, inputs, sliders, tables, trees, tabs, menus, dialogs, toasts, and more.

**DataGrid** with virtualization, sorting, grouping, inline editing, and CSV/TSV/XLSX/PDF export.

**Dock layout** with drag-and-drop panel rearrangement and tab groups.

**Rich text** — multiline input, Markdown and RTF views, syntax highlighting, SVG, bidirectional text via [go-glyph](https://github.com/mike-ward/go-glyph).

**Animation** — keyframe, spring, tween, hero transitions.

**Touch gestures** — tap, double-tap, long-press, pan, swipe, pinch, rotate with automatic mouse synthesis.

**Audio** — opt-in via SDL_mixer; WAV, OGG, MP3, FLAC, MOD.

## Why it's easy to use

No callbacks, no bindings, no reactive machinery. The view function is called every frame. If your state changed, the UI reflects it. That's it.

```go
func view(win *gui.Window, s *State) gui.Widget {
    return gui.Column(
        gui.Text(fmt.Sprintf("Count: %d", s.Count)),
        gui.Button("Increment", func() { s.Count++ }),
    )
}
```

## Beta status

The API is stabilizing. Core widgets and layout are solid. Expect minor breaking changes before 1.0.

Cross-platform support: **macOS, Windows, Linux, iOS, Android, Web (WASM)**.

Requires Go 1.24+.

Source and examples: [github.com/mike-ward/go-gui](https://github.com/mike-ward/go-gui)
