# Install Class Software

The following setup script are provided:

- setup-tooling.ps1
- setup-node-14.ps1
- setup-node-16.ps1

---

## Fork & Clone Class Repo and set Github requirements

Set User and E-Mail in order to be able to commit to git:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@yourdomain.com"
```

Go to `https://github.com/arambazamba/spfx-dev` and fork the repo or use the [GitHub CLI](https://cli.github.com/):

```bash
gh repo fork arambazamba/spfx-dev
```

The forking-workflow allows you to commit your changes to your fork of the repo and still get updates on the repo


Clone Class Repo:

```bash
git clone https://github.com/<GITHUB-USERNAME>/spfx-dev
```