/**
 * Journal Feature - Injection Registration
 *
 * Level 2: Registers all 4 journal QOL injections with InjectionRegistry
 */

import { getRegistry } from '../../../ui/inject/core/registry';
import { AbilitiesInject } from '../../../ui/inject/qol/abilitiesInject';
import * as JournalHints from '../../../ui/inject/qol/journalHints';
import * as JournalFilterSort from '../../../ui/inject/qol/journalFilterSort';
import * as JournalAllTab from '../../../ui/inject/qol/journalAllTab';
import { INJECT_KEYS, storageSet } from '../../../utils/storage';

export function registerInjections(): void {
    const registry = getRegistry();

    // Journal Hints and Filter/Sort are now always enabled.
    // Force storage to true so users can't persist a disabled state.
    storageSet(INJECT_KEYS.JOURNAL_HINTS, true);
    storageSet(INJECT_KEYS.JOURNAL_FILTER_SORT, true);

    registry.register({
        id: 'abilitiesInject',
        name: 'Journal Abilities',
        description: 'Shows pet abilities in journal modal',
        injection: AbilitiesInject,
        storageKey: INJECT_KEYS.ABILITIES_INJECT,
        defaultEnabled: true,
    });

    registry.register({
        id: 'journalHints',
        name: 'Journal Hints',
        description: 'Shows hints for missing journal entries on hover',
        injection: JournalHints,
        storageKey: INJECT_KEYS.JOURNAL_HINTS,
        defaultEnabled: true,
    });

    registry.register({
        id: 'journalFilterSort',
        name: 'Journal Filter/Sort',
        description: 'Adds filter and sort controls to journal overview',
        injection: JournalFilterSort,
        storageKey: INJECT_KEYS.JOURNAL_FILTER_SORT,
        defaultEnabled: true,
    });

    registry.register({
        id: 'journalAllTab',
        name: 'Journal All Tab',
        description: 'Adds an All tab showing combined crops and pets view',
        injection: JournalAllTab,
        storageKey: INJECT_KEYS.JOURNAL_ALL_TAB,
        defaultEnabled: true,
    });
}
