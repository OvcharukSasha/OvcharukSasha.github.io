
var i18n = {};

i18n['ru'] = (function() {
    var t = { lang: 'ru', texts: {}, templates: {}, ui: {}  };

    t.texts['program'] = 'Програма';
    t.texts['tape'] = 'Стрічка';

    t.ui['#btn-help'] = '?';
    t.ui['#btn-help@title'] = 'Довідка';
    t.ui['#btn-start'] = 'Старт';
    t.ui['#btn-start@title'] = 'Запустити програму на виконання';
    t.ui['#btn-step'] = 'Крок';
    t.ui['#btn-step@title'] = 'Виконати наступний крок програми';
    t.ui['#btn-quick'] = 'Швидко';
    t.ui['#btn-quick@title'] = 'Перейти до режиму автоматичного виконання';
    t.ui['#btn-edit'] = 'Повернутися до редагування';
    t.ui['#btn-edit@title'] = 'Повернутися до редагування програми';
    t.ui['#btn-totu4'] = 'У формат TU4';
    t.ui['#btn-totu4@title'] = 'Перетворити програму у формат TU4';
    t.ui['#btn-unmark'] = 'Скинути мітки';
    t.ui['#btn-unmark@title'] = 'Скинути мітки з команд, які використовувалися';

    t.templates['title'] = 'Емулятор машини Тюрінга, v{{version}}';

    t.templates['error/parseError'] = 'Помилка розбору тексту "{{text}}"';
    t.templates['error/programIsEmpty'] = 'Програма пуста';
    t.templates['error/ambiguosCommand'] = 'Неоднозначний перехід для стану "{{cmd.q}}" і знаку "{{cmd.a}}"';
    t.templates['error/targetStateDoesNotExist'] = 'Цільового стану "{{cmd.w}}" не існує';
    t.templates['error/initialStateDoesNotExist'] = 'Початкового стану "{{q}}" не існує';
    t.templates['error/headIsOutOfTape'] = 'Вихід за межі стрічки';
    t.templates['error/noSuchCommand'] = 'Перехід для стану "{{q}}" і знаку "{{a}}" не визначений';

    t.templates['info/finished'] = 'Машина успішно завершила работу';

    t.templates['warning/notNormal_SrcAltered'] = '!!! Затерті/змінені вихідні дані';
    t.templates['warning/notNormal_Misposition'] = '!!! Головка має зупинятися після результату';

    t.templates['stats'] = 'Команд в програмі <b>{{commandsCount}}</b>. Довжина вихідного рядку: <b>{{initialDataLength}}</b>. Використано комірок: <b>{{maxDataLength}}</b>. Виконано операцій: <b>{{operationsCount}}</b>';

    return t;
})();
