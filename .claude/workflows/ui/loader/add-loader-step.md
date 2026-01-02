# Workflow: Add Loader Init Step

1) Add `initX(loader: LoaderController)` in `src/ui/loader/bootstrap.ts`
2) Plug the step into the bootstrap sequence (at the correct position)
3) Re-export it from `src/ui/loader/index.ts`

Note: follow `.claude/rules/ui.loader.md` for logging/error handling/yield/keys.
