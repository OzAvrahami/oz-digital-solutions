# Oz GitHub Development Standard v1 — oz-digital-solutions

This repository follows the [canonical Oz GitHub Development Standard v1](https://github.com/OzAvrahami/ProjectDeck/blob/main/docs/github-development-standard.md), reviewed at ProjectDeck commit `1852390e9bb402ea8b674119c493af0c982631a4`. This document applies that standard to the bilingual Oz Avrahami portfolio and digital-services website; it does not change ProjectDeck's interpretation rules.

- Repository: [OzAvrahami/oz-digital-solutions](https://github.com/OzAvrahami/oz-digital-solutions)
- Website: <https://ozavrahami.co.il>
- Development Project: [Oz Digital Solutions Development](https://github.com/users/OzAvrahami/projects/10), linked directly to this repository. The Project uses its default private visibility; readers need access to it.
- Alignment and audit: [issue #2](https://github.com/OzAvrahami/oz-digital-solutions/issues/2)

## Workflow

GitHub Project Status is the source of truth for workflow state:

```text
Backlog → Ready → In Progress → Verify → Done
```

| Status | Meaning |
| --- | --- |
| Backlog | Captured work not currently planned for implementation. |
| Ready | Defined, prioritized and ready to start. |
| In Progress | Currently being implemented. |
| Verify | Implementation complete; awaiting verification. |
| Done | Completed and verified. |

New issues should enter the Project in Backlog. Closing an issue should move it to Done. Ready, In Progress and Verify are deliberate manual transitions. Do not reset existing active work when adding it to the Project. In particular, WhatsApp issue #1 remains open in Verify pending owner review.

The canonical reference specifies reopening to Ready. This rollout intentionally adds **no reopening automation**, at the owner's direction; review reopened work and set its status manually. See the remaining native-workflow setup below.

## Priority

Priority is a single-select Project field, ordered highest to lowest:

| Option | Meaning |
| --- | --- |
| P0 — Critical | Production outage, data-loss/corruption risk, or immediate intervention. |
| P1 — High | Important work that should be among the next items addressed. |
| P2 — Medium | Normal planned development work; the default during triage. |
| P3 — Low | Nice-to-have work that can reasonably wait. |

Both current issues use P2 — Medium. This is the triage default, not a claim that GitHub automatically populates Priority on new items. Preserve meaningful existing priorities when importing work. Status and Priority are never labels.

## Labels

Use at most one primary type label per issue:

| Primary type | Meaning |
| --- | --- |
| bug | Incorrect existing behavior. |
| feature | New capability. |
| enhancement | Improvement to existing behavior. |
| chore | Maintenance, tooling, dependencies, refactoring or technical debt. |
| documentation | Documentation-only work. |

Canonical meta labels are `duplicate`, `invalid` and `wontfix`.

Scopes identify durable repository surfaces. Multiple scopes may apply:

| Scope | Surface |
| --- | --- |
| frontend | Next.js/React UI, accessibility, navigation and browser behavior. |
| backend | Server actions, contact validation and Resend email delivery. |
| content | Hebrew/English copy, guides, services, disclosures and SEO content. |
| analytics | GA4, contact click events and affiliate attribution. |
| github | Repository metadata, issues, Projects, workflows and Releases. |
| railway | Railway hosting, deployment configuration and runtime operations. |

There is no database scope: the current architecture does not have a database layer. `accessibility`, `good first issue`, `help wanted` and `question` remain useful auxiliary labels; they are neither primary types nor workflow states. No ambiguous label was deleted or merged.

## Project views

- **Development:** board with Status columns; shows Priority, Labels and Assignees.
- **All work:** table showing Title, Status, Priority, Labels and Assignees.

Both views are unfiltered. Keep these two default views unless another view has a demonstrated need. Project #10 was created only after checking the repository relationship and all existing owner Projects; none belonged to this repository.

## Native workflow setup and verification gaps

The API verified the saved fields, option order, views, visible fields, repository link and current item states. It reports the native Item added to project and Item closed workflows as enabled, but does not expose their action settings. The original Todo option was renamed Backlog with its ID preserved; Done also retains its original ID.

Complete these steps in the Project's **Workflows** settings:

1. Configure **Auto-add to project** for `OzAvrahami/oz-digital-solutions` with filter `is:issue is:open`, and enable it. New repository issues are not yet automatically included; both existing issues were added explicitly without duplicates.
2. Confirm **Item added to project** assigns Status = Backlog and **Item closed** assigns Status = Done. Keep both enabled. Do not change the two current Verify items during setup.
3. Disable **Pull request merged** so a merge cannot skip owner verification. **Pull request linked to issue** was removed successfully through the API to keep intermediate status transitions manual.
4. Review the still-enabled **Auto-close issue** default. The requested workflow is owner verification followed by issue closure; disable this reverse automation if closure should remain explicit. Automatic approval review blocked the attempted removal of the PR-merge and auto-close defaults; neither was changed by that attempt.
5. The native **Auto-add sub-issues to project** default remains enabled. It is not a replacement for repository issue auto-add. Add no new reopening automation.

The available GraphQL API supports workflow deletion, but has no create/update workflow mutation; no connected browser was available to edit native rules. These are real remaining configuration steps, not completed automation. Until intake is enabled, add new issues manually, set Backlog and assign P2 — Medium unless triage warrants another priority.

## Issue Forms

The [Issue Forms](../.github/ISSUE_TEMPLATE) adapt the canonical Bug, Feature, Enhancement and Chore forms. The Bug environment prompt asks for website URL, locale, browser/device and viewport. All assigned labels exist in GitHub. Blank issues are disabled by `config.yml`, which has no external chooser links.

Documentation work uses the `documentation` label and needs no dedicated form in v1. When using a form for documentation work, replace its primary type with `documentation`; never retain two primary types. Scope and priority are assigned during triage.

These local forms become active only after the owner commits and pushes them to the default branch. The alignment task remains in Verify until owner review is complete.

## Releases

Published GitHub Releases are authoritative evidence of a released version. A tag alone, a package version, a commit, or a deployment is not a published release.

At the alignment audit, this repository had a `v1.0.0` tag at `6ef8f76ebc1b0799dbbc8f92db9fef23047b60c4` and **no GitHub Releases**. No release was created or historical version inferred. The package version was not changed.

Future meaningful releases use `vMAJOR.MINOR.PATCH`; prereleases may use `vMAJOR.MINOR.PATCH-alpha.N` or `vMAJOR.MINOR.PATCH-beta.N`. Do not create a tag, release or version bump solely to populate ProjectDeck.

[Generated release notes configuration](../.github/release.yml) groups changes by `feature`, `enhancement`, `bug`, `chore` and `documentation`, and excludes `duplicate`, `invalid` and `wontfix`. Apply the appropriate canonical type to release-relevant pull requests as well, because GitHub's generated notes categorize pull requests using their labels.

## Ownership and interpretation

The owner performs staging, commits, pushes, merges, release publication and deployment. This alignment changes development metadata and documentation only; application behavior and ProjectDeck code, credentials and inference rules are unchanged.

ProjectDeck should distinguish type/scope labels, Project Status/Priority, published Releases and runtime state. A private Project requires authorized access. Unpushed local configuration, unfinished native intake setup and a tag without a published Release are explicit interpretation limits, not reasons to fabricate metadata.
