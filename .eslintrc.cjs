module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // Gemini Architecture Rules
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],

        // Custom Rule Stubs (Enforcing MGData usage over hardcoding)
        'no-restricted-syntax': [
            'error',
            {
                selector: 'VariableDeclaration[kind="const"] > VariableDeclarator > ArrayExpression > Literal[value=/^(Gold|Rainbow|AmberMoon|Dawn|Frost|Rain|Sunny)$/]',
                message: '❌ DO NOT hardcode mutation names. Fetch them dynamically from MGData.',
            },
            {
                selector: 'MemberExpression[object.name="MUTATIONS"]',
                message: '❌ Use MGData.get(\'mutations\') instead of a static MUTATIONS constant.',
            }
        ],
    },
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
};
