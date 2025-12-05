<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#00a63e">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="manifest" href="/manifest.json">
    <title>BiblioHaus</title>
    @viteReactRefresh
    @vite('resources/js/main.tsx')
</head>

<body>
    <div id="root"></div>
</body>

</html>
