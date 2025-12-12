# Contributing to Insight Hunter Lite

Thank you for your interest in contributing to Insight Hunter Lite! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Features

We love new ideas! To suggest a feature:
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Explain use cases
- Consider implementation challenges

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/insight-hunter-lite.git
   cd insight-hunter-lite
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   - Ensure the app builds successfully
   - Test all affected features
   - Check responsive design on mobile

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code refactoring
   - `test:` for tests
   - `chore:` for maintenance

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference related issues
   - Add screenshots for UI changes
   - Request review from maintainers

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Follow React best practices

### CSS/Tailwind
- Use Tailwind utility classes
- Avoid custom CSS unless necessary
- Maintain responsive design
- Follow existing color scheme

### File Organization
- One component per file
- Group related files together
- Use index files for exports
- Keep folder structure clean

## Testing

Before submitting a PR:
- [ ] App builds without errors (`npm run build`)
- [ ] All pages load correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors or warnings
- [ ] TypeScript types are correct
- [ ] Code is properly formatted

## Documentation

When adding new features:
- Update README.md if needed
- Add JSDoc comments for complex functions
- Update type definitions
- Include usage examples

## Community Guidelines

- Be respectful and constructive
- Help others learn and grow
- Follow the code of conduct
- Give credit where it's due
- Have fun and build awesome features!

## Questions?

If you have questions about contributing:
- Open a GitHub Discussion
- Check existing issues and PRs
- Review documentation
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making Insight Hunter Lite better! 🚀
