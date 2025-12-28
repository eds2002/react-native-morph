# Contributing

Contributions are always welcome!

## Development workflow

This project uses a monorepo structure with [Bun](https://bun.sh/) workspaces.

To get started with the project, run `bun install` in the root directory:

```bash
bun install
```

### Building the library

```bash
bun run build
```

### Linting

```bash
bun run lint
```

### Type checking

```bash
bun run typecheck
```

### Running the example app

Navigate to the `example` folder and run:

```bash
cd example
bun install
bun start
```

## Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en):

- `fix`: Bug fixes (correlates with PATCH in semver)
- `feat`: New features (correlates with MINOR in semver)
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Releasing

Releases are handled automatically via [release-it](https://github.com/release-it/release-it).

To create a new release:

```bash
bun run release
```

This will:
1. Bump the version based on conventional commits
2. Generate/update the changelog
3. Create a git tag
4. Publish to npm
5. Create a GitHub release
