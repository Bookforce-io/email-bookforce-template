#!/usr/bin/env node
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/cli/index.ts
import { program } from "commander";

// package.json
var package_default = {
  name: "react-email",
  version: "2.1.6",
  description: "A live preview of your emails right in your browser.",
  bin: {
    email: "./cli/index.js"
  },
  scripts: {
    build: "tsup",
    dev: "tsup --watch",
    test: "vitest run",
    "test:watch": "vitest",
    clean: "rm -rf dist",
    lint: "eslint . && tsc"
  },
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/resend/react-email.git",
    directory: "packages/react-email"
  },
  keywords: [
    "react",
    "email"
  ],
  engines: {
    node: ">=18.0.0"
  },
  dependencies: {
    "@babel/core": "7.24.5",
    "@babel/parser": "7.24.5",
    "@radix-ui/colors": "1.0.1",
    "@radix-ui/react-collapsible": "1.1.0",
    "@radix-ui/react-popover": "1.1.1",
    "@radix-ui/react-slot": "1.1.0",
    "@radix-ui/react-toggle-group": "1.1.0",
    "@radix-ui/react-tooltip": "1.1.1",
    "@swc/core": "1.3.101",
    "@types/react": "18.2.47",
    "@types/react-dom": "^18.2.0",
    "@types/webpack": "5.28.5",
    autoprefixer: "10.4.14",
    chalk: "4.1.2",
    chokidar: "3.5.3",
    clsx: "2.1.0",
    commander: "11.1.0",
    debounce: "2.0.0",
    esbuild: "0.19.11",
    "eslint-config-prettier": "9.0.0",
    "eslint-config-turbo": "1.10.12",
    "framer-motion": "10.17.4",
    glob: "10.3.4",
    "log-symbols": "4.1.0",
    "mime-types": "2.1.35",
    next: "14.1.4",
    "normalize-path": "3.0.0",
    ora: "5.4.1",
    postcss: "8.4.38",
    "prism-react-renderer": "2.1.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "socket.io": "4.7.3",
    "socket.io-client": "4.7.3",
    sonner: "1.3.1",
    "source-map-js": "1.0.2",
    "stacktrace-parser": "0.1.10",
    "tailwind-merge": "2.2.0",
    tailwindcss: "3.4.0",
    typescript: "5.1.6"
  },
  devDependencies: {
    "@react-email/components": "workspace:*",
    "@react-email/render": "workspace:*",
    "@types/babel__core": "7.20.5",
    "@types/fs-extra": "11.0.1",
    "@types/mime-types": "2.1.4",
    "@types/node": "18.0.0",
    "@types/normalize-path": "3.0.2",
    "@vercel/style-guide": "5.1.0",
    eslint: "8.50.0",
    tsup: "7.2.0",
    tsx: "4.9.0",
    vitest: "1.1.3"
  }
};

// src/cli/commands/dev.ts
import fs4 from "fs";

// src/cli/utils/tree.ts
import { promises as fs } from "fs";
import os from "os";
import path from "path";
var SYMBOLS = {
  BRANCH: "\u251C\u2500\u2500 ",
  EMPTY: "",
  INDENT: "    ",
  LAST_BRANCH: "\u2514\u2500\u2500 ",
  VERTICAL: "\u2502   "
};
var getTreeLines = async (dirPath, depth, currentDepth = 0) => {
  const base = process.cwd();
  const dirFullpath = path.resolve(base, dirPath);
  const dirname = path.basename(dirFullpath);
  let lines = [dirname];
  const dirStat = await fs.stat(dirFullpath);
  if (dirStat.isDirectory() && currentDepth < depth) {
    const childDirents = await fs.readdir(dirFullpath, { withFileTypes: true });
    childDirents.sort((a, b) => {
      if (a.isDirectory() && b.isFile()) {
        return -1;
      } else if (a.isFile() && b.isDirectory()) {
        return 1;
      }
      return b.name > a.name ? -1 : 1;
    });
    for (let i = 0; i < childDirents.length; i++) {
      const dirent = childDirents[i];
      const isLast = i === childDirents.length - 1;
      const branchingSymbol = isLast ? SYMBOLS.LAST_BRANCH : SYMBOLS.BRANCH;
      const verticalSymbol = isLast ? SYMBOLS.INDENT : SYMBOLS.VERTICAL;
      if (dirent.isFile()) {
        lines.push(`${branchingSymbol}${dirent.name}`);
      } else {
        const pathToDirectory = path.join(dirFullpath, dirent.name);
        const treeLinesForSubDirectory = await getTreeLines(
          pathToDirectory,
          depth,
          currentDepth + 1
        );
        lines = lines.concat(
          treeLinesForSubDirectory.map(
            (line, index) => index === 0 ? `${branchingSymbol}${line}` : `${verticalSymbol}${line}`
          )
        );
      }
    }
  }
  return lines;
};
var tree = async (dirPath, depth) => {
  const lines = await getTreeLines(dirPath, depth);
  return lines.join(os.EOL);
};

// src/cli/utils/preview/hot-reloading/setup-hot-reloading.ts
import path6 from "path";
import { Server as SocketServer } from "socket.io";
import { watch } from "chokidar";
import debounce from "debounce";

// src/cli/utils/preview/hot-reloading/create-dependency-graph.ts
import path5 from "path";
import { existsSync, promises as fs3, statSync } from "fs";

// src/cli/utils/preview/hot-reloading/get-imported-modules.ts
import { traverse } from "@babel/core";
import { parse } from "@babel/parser";
var getImportedModules = (contents) => {
  const importedPaths = [];
  const parsedContents = parse(contents, {
    sourceType: "unambiguous",
    strictMode: false,
    errorRecovery: true,
    plugins: ["jsx", "typescript"]
  });
  traverse(parsedContents, {
    ImportDeclaration({ node }) {
      importedPaths.push(node.source.value);
    },
    ExportAllDeclaration({ node }) {
      importedPaths.push(node.source.value);
    },
    ExportNamedDeclaration({ node }) {
      if (node.source) {
        importedPaths.push(node.source.value);
      }
    },
    CallExpression({ node }) {
      if ("name" in node.callee && node.callee.name === "require") {
        if (node.arguments.length === 1) {
          const importPathNode = node.arguments[0];
          if (importPathNode.type === "StringLiteral") {
            importedPaths.push(importPathNode.value);
          }
        }
      }
    }
  });
  return importedPaths;
};

// src/cli/utils/preview/start-dev-server.ts
import path4 from "path";
import http from "http";
import url from "url";
import next from "next";
import ora from "ora";
import logSymbols from "log-symbols";
import chalk from "chalk";

// src/cli/utils/close-ora-on-sigint.ts
var closeOraOnSIGNIT = (spinner) => {
  process.on("SIGINT", () => {
    spinner.stop();
  });
};

// src/cli/utils/preview/serve-static-file.ts
import path2 from "path";
import { promises as fs2 } from "fs";
import { lookup } from "mime-types";
var serveStaticFile = async (res, parsedUrl, staticDirRelativePath) => {
  const staticBaseDir = path2.join(process.cwd(), staticDirRelativePath);
  const pathname = parsedUrl.pathname;
  const ext = path2.parse(pathname).ext;
  let fileAbsolutePath = path2.join(staticBaseDir, pathname);
  const fileHandle = await fs2.open(fileAbsolutePath, "r");
  try {
    const fileData = await fs2.readFile(fileHandle);
    res.setHeader("Content-type", lookup(ext) || "text/plain");
    res.end(fileData);
  } catch (exception) {
    console.error(
      `Could not read file at ${fileAbsolutePath} to be served, here's the exception:`,
      exception
    );
    res.statusCode = 500;
    res.end(
      `Could not read file to be served! Check your terminal for more information.`
    );
  } finally {
    fileHandle.close();
  }
};

// src/cli/utils/preview/get-env-variables-for-preview-app.ts
import path3 from "path";
var getEnvVariablesForPreviewApp = (relativePathToEmailsDirectory, cliPackageLocation, cwd) => {
  return {
    NEXT_PUBLIC_EMAILS_DIR_RELATIVE_PATH: relativePathToEmailsDirectory,
    NEXT_PUBLIC_CLI_PACKAGE_LOCATION: cliPackageLocation,
    NEXT_PUBLIC_OS_PATH_SEPARATOR: path3.sep,
    NEXT_PUBLIC_USER_PROJECT_LOCATION: cwd
  };
};

// src/cli/utils/preview/start-dev-server.ts
var devServer;
var safeAsyncServerListen = (server, port) => {
  return new Promise((resolve2) => {
    server.listen(port, () => {
      resolve2({ portAlreadyInUse: false });
    });
    server.on("error", (e) => {
      if (e.code === "EADDRINUSE") {
        resolve2({ portAlreadyInUse: true });
      }
    });
  });
};
var isRunningBuilt = __filename.endsWith(path4.join("cli", "index.js"));
var cliPacakgeLocation = isRunningBuilt ? path4.resolve(__dirname, "..") : path4.resolve(__dirname, "../../../..");
var startDevServer = async (emailsDirRelativePath, staticBaseDirRelativePath, port) => {
  devServer = http.createServer((req, res) => {
    if (!req.url) {
      res.end(404);
      return;
    }
    const parsedUrl = url.parse(req.url, true);
    res.setHeader(
      "Cache-Control",
      "no-cache, max-age=0, must-revalidate, no-store"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "-1");
    try {
      if (parsedUrl.path && parsedUrl.path.includes("static/") && !parsedUrl.path.includes("_next/static/")) {
        void serveStaticFile(res, parsedUrl, staticBaseDirRelativePath);
      } else if (!isNextReady) {
        void nextReadyPromise.then(
          () => nextHandleRequest?.(req, res, parsedUrl)
        );
      } else {
        void nextHandleRequest?.(req, res, parsedUrl);
      }
    } catch (e) {
      console.error("caught error", e);
      res.writeHead(500);
      res.end();
    }
  });
  const { portAlreadyInUse } = await safeAsyncServerListen(devServer, port);
  if (!portAlreadyInUse) {
    console.log(chalk.greenBright(`    React Email ${package_default.version}`));
    console.log(`    Running preview at:          http://localhost:${port}
`);
  } else {
    const nextPortToTry = port + 1;
    console.warn(
      ` ${logSymbols.warning} Port ${port} is already in use, trying ${nextPortToTry}`
    );
    return startDevServer(
      emailsDirRelativePath,
      staticBaseDirRelativePath,
      nextPortToTry
    );
  }
  devServer.on("close", async () => {
    await app.close();
  });
  devServer.on("error", (e) => {
    console.error(
      ` ${logSymbols.error} preview server error: `,
      JSON.stringify(e)
    );
    process.exit(1);
  });
  const spinner = ora({
    text: "Getting react-email preview server ready...\n",
    prefixText: " "
  }).start();
  closeOraOnSIGNIT(spinner);
  const timeBeforeNextReady = performance.now();
  process.env = {
    ...process.env,
    ...getEnvVariablesForPreviewApp(
      // If we don't do normalization here, stuff like https://github.com/resend/react-email/issues/1354 happens.
      path4.normalize(emailsDirRelativePath),
      cliPacakgeLocation,
      process.cwd()
    )
  };
  const app = next({
    // passing in env here does not get the environment variables there
    dev: true,
    hostname: "localhost",
    port,
    dir: cliPacakgeLocation
  });
  let isNextReady = false;
  const nextReadyPromise = app.prepare();
  await nextReadyPromise;
  isNextReady = true;
  const nextHandleRequest = app.getRequestHandler();
  const secondsToNextReady = ((performance.now() - timeBeforeNextReady) / 1e3).toFixed(1);
  spinner.stopAndPersist({
    text: `Ready in ${secondsToNextReady}s
`,
    symbol: logSymbols.success
  });
  return devServer;
};
var makeExitHandler = (options) => (_codeOrSignal) => {
  if (typeof devServer !== "undefined") {
    console.log("\nshutting down dev server");
    devServer.close();
    devServer = void 0;
  }
  if (options?.shouldKillProcess) {
    process.exit(options.killWithErrorCode ? 1 : 0);
  }
};
process.on("exit", makeExitHandler());
process.on(
  "SIGINT",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: false })
);
process.on(
  "SIGUSR1",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: false })
);
process.on(
  "SIGUSR2",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: false })
);
process.on(
  "uncaughtException",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: true })
);

// src/cli/utils/preview/hot-reloading/create-dependency-graph.ts
var readAllFilesInsideDirectory = async (directory) => {
  let allFilePaths = [];
  const topLevelDirents = await fs3.readdir(directory, { withFileTypes: true });
  for await (const dirent of topLevelDirents) {
    const pathToDirent = path5.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      allFilePaths = allFilePaths.concat(
        await readAllFilesInsideDirectory(pathToDirent)
      );
    } else {
      allFilePaths.push(pathToDirent);
    }
  }
  return allFilePaths;
};
var isJavascriptModule = (filePath) => {
  const extensionName = path5.extname(filePath);
  return [".js", ".ts", ".jsx", ".tsx", ".mjs", ".cjs"].includes(extensionName);
};
var checkFileExtensionsUntilItExists = (pathWithoutExtension) => {
  if (existsSync(`${pathWithoutExtension}.ts`)) {
    return `${pathWithoutExtension}.ts`;
  } else if (existsSync(`${pathWithoutExtension}.tsx`)) {
    return `${pathWithoutExtension}.tsx`;
  } else if (existsSync(`${pathWithoutExtension}.js`)) {
    return `${pathWithoutExtension}.js`;
  } else if (existsSync(`${pathWithoutExtension}.jsx`)) {
    return `${pathWithoutExtension}.jsx`;
  } else if (existsSync(`${pathWithoutExtension}.mjs`)) {
    return `${pathWithoutExtension}.mjs`;
  } else if (existsSync(`${pathWithoutExtension}.cjs`)) {
    return `${pathWithoutExtension}.cjs`;
  }
};
var createDependencyGraph = async (directory) => {
  const filePaths = await readAllFilesInsideDirectory(directory);
  const modulePaths = filePaths.filter(isJavascriptModule);
  const graph = Object.fromEntries(
    modulePaths.map((path12) => [
      path12,
      {
        path: path12,
        dependencyPaths: [],
        dependentPaths: [],
        moduleDependencies: []
      }
    ])
  );
  const getDependencyPaths = async (filePath) => {
    const contents = await fs3.readFile(filePath, "utf8");
    const importedPaths = getImportedModules(contents);
    const importedPathsRelativeToDirectory = importedPaths.map(
      (dependencyPath) => {
        const isModulePath = !dependencyPath.startsWith(".");
        if (!isModulePath && !path5.isAbsolute(dependencyPath)) {
          let pathToDependencyFromDirectory = path5.resolve(
            /*
                          path.resolve resolves paths differently from what imports on javascript do.
            
                          So if we wouldn't do this, for an email at "/path/to/email.tsx" with a dependecy path of "./other-email" 
                          would end up going into /path/to/email.tsx/other-email instead of /path/to/other-email which is the
                          one the import is meant to go to
                        */
            path5.dirname(filePath),
            dependencyPath
          );
          let isDirectory = false;
          try {
            isDirectory = statSync(pathToDependencyFromDirectory).isDirectory();
          } catch (_) {
          }
          if (isDirectory) {
            const pathToSubDirectory = pathToDependencyFromDirectory;
            const pathWithExtension = checkFileExtensionsUntilItExists(
              `${pathToSubDirectory}/index`
            );
            if (pathWithExtension) {
              pathToDependencyFromDirectory = pathWithExtension;
            } else if (!isRunningBuilt) {
              console.warn(
                `Could not find index file for directory at ${pathToDependencyFromDirectory}. This is probably going to cause issues with both hot reloading and your code.`
              );
            }
          }
          if (!isJavascriptModule(pathToDependencyFromDirectory)) {
            const pathWithExtension = checkFileExtensionsUntilItExists(
              pathToDependencyFromDirectory
            );
            if (pathWithExtension) {
              pathToDependencyFromDirectory = pathWithExtension;
            } else if (!isRunningBuilt) {
              console.warn(
                `Could not determine the file extension for the file at ${pathWithExtension}`
              );
            }
          }
          return pathToDependencyFromDirectory;
        } else {
          return dependencyPath;
        }
      }
    );
    const moduleDependencies = importedPathsRelativeToDirectory.filter(
      (dependencyPath) => !dependencyPath.startsWith(".") && !path5.isAbsolute(dependencyPath)
    );
    const nonNodeModuleImportPathsRelativeToDirectory = importedPathsRelativeToDirectory.filter(
      (dependencyPath) => dependencyPath.startsWith(".") || path5.isAbsolute(dependencyPath)
    );
    return {
      dependencyPaths: nonNodeModuleImportPathsRelativeToDirectory,
      moduleDependencies
    };
  };
  const updateModuleDependenciesInGraph = async (moduleFilePath) => {
    const module = graph[moduleFilePath] ?? {
      path: moduleFilePath,
      dependencyPaths: [],
      dependentPaths: [],
      moduleDependencies: []
    };
    const { moduleDependencies, dependencyPaths: newDependencyPaths } = await getDependencyPaths(moduleFilePath);
    module.moduleDependencies = moduleDependencies;
    for (const dependencyPath of module.dependencyPaths) {
      if (newDependencyPaths.includes(dependencyPath))
        continue;
      const dependencyModule = graph[dependencyPath];
      if (dependencyModule !== void 0) {
        dependencyModule.dependentPaths = dependencyModule.dependentPaths.filter(
          (dependentPath) => dependentPath !== moduleFilePath
        );
      }
    }
    module.dependencyPaths = newDependencyPaths;
    for (const dependencyPath of newDependencyPaths) {
      const dependencyModule = graph[dependencyPath];
      if (dependencyModule !== void 0 && !dependencyModule.dependentPaths.includes(moduleFilePath)) {
        dependencyModule.dependentPaths.push(moduleFilePath);
      } else {
        graph[dependencyPath] = {
          path: dependencyPath,
          moduleDependencies: [],
          dependencyPaths: [],
          dependentPaths: [moduleFilePath]
        };
      }
    }
    graph[moduleFilePath] = module;
  };
  for (const filePath of modulePaths) {
    await updateModuleDependenciesInGraph(filePath);
  }
  const removeModuleFromGraph = (filePath) => {
    const module = graph[filePath];
    if (module) {
      for (const dependencyPath of module.dependencyPaths) {
        if (graph[dependencyPath]) {
          graph[dependencyPath].dependentPaths = graph[dependencyPath].dependentPaths.filter(
            (dependentPath) => dependentPath !== filePath
          );
        }
      }
      delete graph[filePath];
    }
  };
  return [
    graph,
    async (event, pathToModified) => {
      switch (event) {
        case "change":
          if (isJavascriptModule(pathToModified)) {
            await updateModuleDependenciesInGraph(pathToModified);
          }
          break;
        case "add":
          if (isJavascriptModule(pathToModified)) {
            await updateModuleDependenciesInGraph(pathToModified);
          }
          break;
        case "addDir":
          const filesInsideAddedDirectory = await readAllFilesInsideDirectory(pathToModified);
          const modulesInsideAddedDirectory = filesInsideAddedDirectory.filter(isJavascriptModule);
          for await (const filePath of modulesInsideAddedDirectory) {
            await updateModuleDependenciesInGraph(filePath);
          }
          break;
        case "unlink":
          if (isJavascriptModule(pathToModified)) {
            removeModuleFromGraph(pathToModified);
          }
          break;
        case "unlinkDir":
          const filesInsideDeletedDirectory = await readAllFilesInsideDirectory(pathToModified);
          const modulesInsideDeletedDirectory = filesInsideDeletedDirectory.filter(isJavascriptModule);
          for await (const filePath of modulesInsideDeletedDirectory) {
            removeModuleFromGraph(filePath);
          }
          break;
      }
    },
    {
      resolveDependentsOf: function resolveDependentsOf(pathToModule) {
        const moduleEntry = graph[pathToModule];
        const dependentPaths = [];
        if (moduleEntry) {
          for (const dependentPath of moduleEntry.dependentPaths) {
            const dependentsOfDependent = resolveDependentsOf(dependentPath);
            dependentPaths.push(...dependentsOfDependent);
            dependentPaths.push(dependentPath);
          }
        }
        return dependentPaths;
      }
    }
  ];
};

// src/cli/utils/preview/hot-reloading/setup-hot-reloading.ts
var setupHotreloading = async (devServer2, emailDirRelativePath) => {
  let clients = [];
  const io = new SocketServer(devServer2);
  io.on("connection", (client) => {
    clients.push(client);
    client.on("disconnect", () => {
      clients = clients.filter((item) => item !== client);
    });
  });
  let changes = [];
  const reload = debounce(() => {
    clients.forEach((client) => {
      client.emit("reload", changes);
    });
    changes = [];
  }, 150);
  const absolutePathToEmailsDirectory = path6.resolve(
    process.cwd(),
    emailDirRelativePath
  );
  const [dependencyGraph, updateDependencyGraph, { resolveDependentsOf }] = await createDependencyGraph(absolutePathToEmailsDirectory);
  const watcher = watch(emailDirRelativePath, {
    ignoreInitial: true,
    cwd: process.cwd(),
    // eslint-disable-next-line prefer-named-capture-group
    ignored: /(^|[/\\])\../
    // ignore dotfiles
  });
  const getFilesOutsideEmailsDirectory = () => Object.keys(dependencyGraph).filter(
    (p) => path6.relative(absolutePathToEmailsDirectory, p).startsWith("..")
  );
  let filesOutsideEmailsDirectory = getFilesOutsideEmailsDirectory();
  for (const p of filesOutsideEmailsDirectory) {
    watcher.add(p);
  }
  const exit = async () => {
    await watcher.close();
  };
  process.on("SIGINT", exit);
  process.on("uncaughtException", exit);
  watcher.on("all", async (event, relativePathToChangeTarget) => {
    const file = relativePathToChangeTarget.split(path6.sep);
    if (file.length === 0) {
      return;
    }
    const pathToChangeTarget = path6.resolve(
      process.cwd(),
      relativePathToChangeTarget
    );
    await updateDependencyGraph(event, pathToChangeTarget);
    const newFilesOutsideEmailsDirectory = getFilesOutsideEmailsDirectory();
    for (const p of filesOutsideEmailsDirectory) {
      if (!newFilesOutsideEmailsDirectory.includes(p)) {
        watcher.unwatch(p);
      }
    }
    for (const p of newFilesOutsideEmailsDirectory) {
      if (!filesOutsideEmailsDirectory.includes(p)) {
        watcher.add(p);
      }
    }
    filesOutsideEmailsDirectory = newFilesOutsideEmailsDirectory;
    changes.push({
      event,
      filename: relativePathToChangeTarget
    });
    for (const dependentPath of resolveDependentsOf(pathToChangeTarget)) {
      changes.push({
        event: "change",
        filename: path6.relative(absolutePathToEmailsDirectory, dependentPath)
      });
    }
    reload();
  });
  return watcher;
};

// src/cli/commands/dev.ts
var dev = async ({ dir: emailsDirRelativePath, port }) => {
  try {
    if (!fs4.existsSync(emailsDirRelativePath)) {
      throw new Error(`Missing ${emailsDirRelativePath} folder`);
    }
    const devServer2 = await startDevServer(
      emailsDirRelativePath,
      emailsDirRelativePath,
      // defaults to ./emails/static for the static files that are served to the preview
      parseInt(port)
    );
    await setupHotreloading(devServer2, emailsDirRelativePath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// src/cli/commands/export.ts
import fs7, { unlinkSync, writeFileSync } from "fs";
import path9 from "path";
import { glob } from "glob";
import { build } from "esbuild";
import ora2 from "ora";
import logSymbols2 from "log-symbols";
import normalize from "normalize-path";

// src/actions/get-emails-directory-metadata.ts
import fs5 from "fs";
import path7 from "path";
var isFileAnEmail = (fullPath) => {
  const stat = fs5.statSync(fullPath);
  if (stat.isDirectory())
    return false;
  const { ext } = path7.parse(fullPath);
  if (![".js", ".tsx", ".jsx"].includes(ext))
    return false;
  if (!fs5.existsSync(fullPath)) {
    return false;
  }
  const fileContents = fs5.readFileSync(fullPath, "utf8");
  return /\bexport\s+default\b/gm.test(fileContents);
};
var mergeDirectoriesWithSubDirectories = (emailsDirectoryMetadata) => {
  let currentResultingMergedDirectory = emailsDirectoryMetadata;
  while (currentResultingMergedDirectory.emailFilenames.length === 0 && currentResultingMergedDirectory.subDirectories.length === 1) {
    const onlySubDirectory = currentResultingMergedDirectory.subDirectories[0];
    currentResultingMergedDirectory = {
      subDirectories: onlySubDirectory.subDirectories,
      emailFilenames: onlySubDirectory.emailFilenames,
      absolutePath: onlySubDirectory.absolutePath,
      directoryName: path7.join(
        currentResultingMergedDirectory.directoryName,
        onlySubDirectory.directoryName
      )
    };
  }
  return currentResultingMergedDirectory;
};
var getEmailsDirectoryMetadata = async (absolutePathToEmailsDirectory, keepFileExtensions = false) => {
  if (!fs5.existsSync(absolutePathToEmailsDirectory))
    return;
  const dirents = await fs5.promises.readdir(absolutePathToEmailsDirectory, {
    withFileTypes: true
  });
  const emailFilenames = dirents.filter(
    (dirent) => isFileAnEmail(path7.join(absolutePathToEmailsDirectory, dirent.name))
  ).map(
    (dirent) => keepFileExtensions ? dirent.name : dirent.name.replace(path7.extname(dirent.name), "")
  );
  const subDirectories = await Promise.all(
    dirents.filter(
      (dirent) => dirent.isDirectory() && !dirent.name.startsWith("_") && dirent.name !== "static"
    ).map(
      (dirent) => getEmailsDirectoryMetadata(
        path7.join(absolutePathToEmailsDirectory, dirent.name)
      )
    )
  );
  return mergeDirectoriesWithSubDirectories({
    absolutePath: absolutePathToEmailsDirectory,
    directoryName: absolutePathToEmailsDirectory.split(path7.sep).pop(),
    emailFilenames,
    subDirectories
  });
};

// src/utils/render-resolver-esbuild-plugin.ts
import path8 from "path";
import { promises as fs6 } from "fs";
function escapeStringForRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var renderResolver = (emailTemplates) => ({
  name: "render-resolver",
  setup: (b) => {
    b.onLoad(
      {
        filter: new RegExp(
          emailTemplates.map((emailPath) => escapeStringForRegex(emailPath)).join("|")
        )
      },
      async ({ path: pathToFile }) => {
        return {
          contents: `${await fs6.readFile(pathToFile, "utf8")};
          export { renderAsync } from 'react-email-module-that-will-export-render'
        `,
          loader: path8.extname(pathToFile).slice(1)
        };
      }
    );
    b.onResolve(
      { filter: /^react-email-module-that-will-export-render$/ },
      async (args) => {
        const options = {
          kind: "import-statement",
          importer: args.importer,
          resolveDir: args.resolveDir,
          namespace: args.namespace
        };
        let result = await b.resolve("@react-email/render", options);
        if (result.errors.length === 0) {
          return result;
        }
        result = await b.resolve("@react-email/components", options);
        if (result.errors.length > 0 && result.errors[0]) {
          result.errors[0].text = "Failed trying to import `renderAsync` from either `@react-email/render` or `@react-email/components` to be able to render your email template.\n Maybe you don't have either of them installed?";
        }
        return result;
      }
    );
  }
});

// src/cli/commands/export.ts
import { createElement } from "react";
var getEmailTemplatesFromDirectory = (emailDirectory) => {
  const templatePaths = [];
  emailDirectory.emailFilenames.forEach(
    (filename) => templatePaths.push(path9.join(emailDirectory.absolutePath, filename))
  );
  emailDirectory.subDirectories.forEach((directory) => {
    templatePaths.push(...getEmailTemplatesFromDirectory(directory));
  });
  return templatePaths;
};
var exportTemplates = async (pathToWhereEmailMarkupShouldBeDumped, emailsDirectoryPath, options) => {
  if (fs7.existsSync(pathToWhereEmailMarkupShouldBeDumped)) {
    fs7.rmSync(pathToWhereEmailMarkupShouldBeDumped, { recursive: true });
  }
  let spinner;
  if (!options.silent) {
    spinner = ora2("Preparing files...\n").start();
    closeOraOnSIGNIT(spinner);
  }
  const emailsDirectoryMetadata = await getEmailsDirectoryMetadata(
    path9.resolve(process.cwd(), emailsDirectoryPath),
    true
  );
  if (typeof emailsDirectoryMetadata === "undefined") {
    if (spinner) {
      spinner.stopAndPersist({
        symbol: logSymbols2.error,
        text: `Could not find the directory at ${emailsDirectoryPath}`
      });
    }
    return;
  }
  const allTemplates = getEmailTemplatesFromDirectory(emailsDirectoryMetadata);
  try {
    await build({
      bundle: true,
      entryPoints: allTemplates,
      plugins: [renderResolver(allTemplates)],
      platform: "node",
      format: "cjs",
      loader: { ".js": "jsx" },
      outExtension: { ".js": ".cjs" },
      jsx: "transform",
      write: true,
      outdir: pathToWhereEmailMarkupShouldBeDumped
    });
  } catch (exception) {
    const buildFailure = exception;
    if (spinner) {
      spinner.stopAndPersist({
        symbol: logSymbols2.error,
        text: "Failed to build emails"
      });
    }
    console.warn(buildFailure.warnings);
    console.error(buildFailure.errors);
    throw new Error(
      `esbuild bundling process for email templates failed:
${allTemplates.map((p) => `- ${p}`).join("\n")}`
    );
  }
  if (spinner) {
    spinner.succeed();
  }
  const allBuiltTemplates = glob.sync(
    normalize(`${pathToWhereEmailMarkupShouldBeDumped}/**/*.cjs`),
    {
      absolute: true
    }
  );
  for (const template of allBuiltTemplates) {
    try {
      if (spinner) {
        spinner.text = `rendering ${template.split("/").pop()}`;
        spinner.render();
      }
      delete __require.cache[template];
      const emailModule = __require(template);
      const rendered = await emailModule.renderAsync(
        createElement(emailModule.default, {}),
        options
      );
      const htmlPath = template.replace(
        ".cjs",
        options.plainText ? ".txt" : ".html"
      );
      writeFileSync(htmlPath, rendered);
      unlinkSync(template);
    } catch (exception) {
      if (spinner) {
        spinner.stopAndPersist({
          symbol: logSymbols2.error,
          text: `failed when rendering ${template.split("/").pop()}`
        });
      }
      console.error(exception);
      throw exception;
    }
  }
  if (spinner) {
    spinner.succeed("Rendered all files");
    spinner.text = `Copying static files`;
    spinner.render();
  }
  const staticDirectoryPath = path9.join(emailsDirectoryPath, "static");
  if (fs7.existsSync(staticDirectoryPath)) {
    const pathToDumpStaticFilesInto = path9.join(
      pathToWhereEmailMarkupShouldBeDumped,
      "static"
    );
    if (fs7.existsSync(pathToDumpStaticFilesInto))
      await fs7.promises.rm(pathToDumpStaticFilesInto, { recursive: true });
    try {
      await fs7.promises.cp(staticDirectoryPath, pathToDumpStaticFilesInto, {
        recursive: true
      });
    } catch (exception) {
      console.error(exception);
      if (spinner) {
        spinner.stopAndPersist({
          symbol: logSymbols2.error,
          text: "Failed to copy static files"
        });
      }
      throw new Error(
        `Something went wrong while copying the file to ${pathToWhereEmailMarkupShouldBeDumped}/static, ${exception}`
      );
    }
  }
  if (spinner && !options.silent) {
    spinner.succeed();
    const fileTree = await tree(pathToWhereEmailMarkupShouldBeDumped, 4);
    console.log(fileTree);
    spinner.stopAndPersist({
      symbol: logSymbols2.success,
      text: "Successfully exported emails"
    });
  }
};

// src/cli/commands/build.ts
import fs8 from "fs";
import path10 from "path";
import ora3 from "ora";
import { spawn } from "child_process";
import logSymbols3 from "log-symbols";
var buildPreviewApp = (absoluteDirectory) => {
  return new Promise((resolve2, reject) => {
    const nextBuild = spawn("npm", ["run", "build"], {
      cwd: absoluteDirectory,
      shell: true
    });
    nextBuild.stdout.pipe(process.stdout);
    nextBuild.stderr.pipe(process.stderr);
    nextBuild.on("close", (code) => {
      if (code === 0) {
        resolve2();
      } else {
        reject(
          new Error(
            `Unable to build the Next app and it exited with code: ${code}`
          )
        );
      }
    });
  });
};
var setNextEnvironmentVariablesForBuild = async (emailsDirRelativePath, builtPreviewAppPath) => {
  const envVariables = {
    ...getEnvVariablesForPreviewApp(
      // If we don't do normalization here, stuff like https://github.com/resend/react-email/issues/1354 happens.
      path10.normalize(emailsDirRelativePath),
      "PLACEHOLDER",
      "PLACEHOLDER"
    ),
    NEXT_PUBLIC_IS_BUILDING: "true"
  };
  const nextConfigContents = `
const path = require('path');
/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    ...${JSON.stringify(envVariables)},
    NEXT_PUBLIC_USER_PROJECT_LOCATION: path.resolve(process.cwd(), '../'),
    NEXT_PUBLIC_CLI_PACKAGE_LOCATION: process.cwd(),
  },
  // this is needed so that the code for building emails works properly
  webpack: (
    /** @type {import('webpack').Configuration & { externals: string[] }} */
    config,
    { isServer }
  ) => {
    if (isServer) {
      config.externals.push('esbuild');
    }

    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    webpackBuildWorker: true
  },
}`;
  await fs8.promises.writeFile(
    path10.resolve(builtPreviewAppPath, "./next.config.js"),
    nextConfigContents,
    "utf8"
  );
};
var getEmailSlugsFromEmailDirectory = (emailDirectory, emailsDirectoryAbsolutePath) => {
  const directoryPathRelativeToEmailsDirectory = emailDirectory.absolutePath.replace(emailsDirectoryAbsolutePath, "").trim();
  const slugs = [];
  emailDirectory.emailFilenames.forEach(
    (filename) => slugs.push(
      path10.join(directoryPathRelativeToEmailsDirectory, filename).split(path10.sep).filter((segment) => segment.length > 0)
    )
  );
  emailDirectory.subDirectories.forEach((directory) => {
    slugs.push(
      ...getEmailSlugsFromEmailDirectory(
        directory,
        emailsDirectoryAbsolutePath
      )
    );
  });
  return slugs;
};
var forceSSGForEmailPreviews = async (emailsDirPath, builtPreviewAppPath) => {
  const emailDirectoryMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await getEmailsDirectoryMetadata(emailsDirPath)
  );
  const parameters = getEmailSlugsFromEmailDirectory(
    emailDirectoryMetadata,
    emailsDirPath
  ).map((slug) => ({ slug }));
  await fs8.promises.appendFile(
    path10.resolve(builtPreviewAppPath, "./src/app/preview/[...slug]/page.tsx"),
    `

export function generateStaticParams() { 
  return Promise.resolve(
    ${JSON.stringify(parameters)}
  );
}`,
    "utf8"
  );
};
var updatePackageJson = async (builtPreviewAppPath) => {
  const packageJsonPath = path10.resolve(builtPreviewAppPath, "./package.json");
  const packageJson = JSON.parse(
    await fs8.promises.readFile(packageJsonPath, "utf8")
  );
  packageJson.scripts.build = "next build";
  packageJson.scripts.start = "next start";
  packageJson.name = "preview-server";
  delete packageJson.devDependencies["@react-email/render"];
  delete packageJson.devDependencies["@react-email/components"];
  packageJson.dependencies.sharp = "0.33.2";
  await fs8.promises.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson),
    "utf8"
  );
};
var npmInstall = async (builtPreviewAppPath, packageManager) => {
  return new Promise(async (resolve2, reject) => {
    const childProc = spawn(packageManager, ["install", "--silent"], {
      cwd: builtPreviewAppPath,
      shell: true
    });
    childProc.stdout.pipe(process.stdout);
    childProc.stderr.pipe(process.stderr);
    childProc.on("close", (code) => {
      if (code === 0) {
        resolve2();
      } else {
        reject(
          new Error(
            `Unable to install the dependencies and it exited with code: ${code}`
          )
        );
      }
    });
  });
};
var build2 = async ({
  dir: emailsDirRelativePath,
  packageManager
}) => {
  try {
    const spinner = ora3({
      text: "Starting build process...",
      prefixText: "  "
    }).start();
    closeOraOnSIGNIT(spinner);
    spinner.text = "Checking if emails folder exists";
    if (!fs8.existsSync(emailsDirRelativePath)) {
      throw new Error(`Missing ${emailsDirRelativePath} folder`);
    }
    const emailsDirPath = path10.join(process.cwd(), emailsDirRelativePath);
    const staticPath = path10.join(emailsDirPath, "static");
    const builtPreviewAppPath = path10.join(process.cwd(), ".react-email");
    if (fs8.existsSync(builtPreviewAppPath)) {
      spinner.text = "Deleting pre-existing `.react-email` folder";
      await fs8.promises.rm(builtPreviewAppPath, { recursive: true });
    }
    spinner.text = "Copying preview app from CLI to `.react-email`";
    await fs8.promises.cp(cliPacakgeLocation, builtPreviewAppPath, {
      recursive: true,
      filter: (source) => {
        return !/(\/|\\)cli(\/|\\)?/.test(source) && !/(\/|\\)\.next(\/|\\)?/.test(source) && !/(\/|\\)\.turbo(\/|\\)?/.test(source) && !/(\/|\\)node_modules(\/|\\)?$/.test(source);
      }
    });
    if (fs8.existsSync(staticPath)) {
      spinner.text = "Copying `static` folder into `.react-email/public/static`";
      const builtStaticDirectory = path10.resolve(
        builtPreviewAppPath,
        "./public/static"
      );
      await fs8.promises.cp(staticPath, builtStaticDirectory, {
        recursive: true
      });
    }
    spinner.text = "Setting Next environment variables for preview app to work properly";
    await setNextEnvironmentVariablesForBuild(
      emailsDirRelativePath,
      builtPreviewAppPath
    );
    spinner.text = "Setting server side generation for the email preview pages";
    await forceSSGForEmailPreviews(emailsDirPath, builtPreviewAppPath);
    spinner.text = "Updating package.json's build and start scripts";
    await updatePackageJson(builtPreviewAppPath);
    spinner.text = "Installing dependencies on `.react-email`";
    await npmInstall(builtPreviewAppPath, packageManager);
    spinner.stopAndPersist({
      text: "Successfully prepared `.react-email` for `next build`",
      symbol: logSymbols3.success
    });
    await buildPreviewApp(builtPreviewAppPath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// src/cli/commands/start.ts
import fs9 from "fs";
import path11 from "path";
import { spawn as spawn2 } from "child_process";
var start = async () => {
  try {
    const usersProjectLocation = process.cwd();
    const builtPreviewPath = path11.resolve(
      usersProjectLocation,
      "./.react-email"
    );
    if (!fs9.existsSync(builtPreviewPath)) {
      throw new Error(
        "Could not find `.react-email`, maybe you haven't ran `email build`?"
      );
    }
    const nextStart = spawn2("npm", ["start"], {
      cwd: builtPreviewPath,
      shell: true
    });
    nextStart.stdout.pipe(process.stdout);
    nextStart.stderr.pipe(process.stderr);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// src/cli/index.ts
var PACKAGE_NAME = "react-email";
program.name(PACKAGE_NAME).description("A live preview of your emails right in your browser").version(package_default.version);
program.command("dev").description("Starts the preview email development app").option("-d, --dir <path>", "Directory with your email templates", "./emails").option("-p --port <port>", "Port to run dev server on", "3000").action(dev);
program.command("build").description("Copies the preview app for onto .react-email and builds it").option("-d, --dir <path>", "Directory with your email templates", "./emails").option(
  "-p --packageManager <name>",
  "Package name to use on installation on `.react-email`",
  "npm"
).action(build2);
program.command("start").description('Runs the built preview app that is inside of ".react-email"').action(start);
program.command("export").description("Build the templates to the `out` directory").option("--outDir <path>", "Output directory", "out").option("-p, --pretty", "Pretty print the output", false).option("-t, --plainText", "Set output format as plain text", false).option("-d, --dir <path>", "Directory with your email templates", "./emails").option(
  "-s, --silent",
  "To, or not to show a spinner with process information",
  false
).action(
  ({ outDir, pretty, plainText, silent, dir: srcDir }) => exportTemplates(outDir, srcDir, { pretty, silent, plainText })
);
program.parse();
