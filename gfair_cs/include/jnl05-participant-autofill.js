(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const text = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
  const optionMap = new Map();
  const manualCardState = new WeakMap();
  const getField = (form, name) => form.querySelector(`[name="${name}"]`);
  const setLockedValue = (form, name, value) => {
    const field = getField(form, name);
    if (field && value !== undefined && value !== null) field.value = value;
  };
  const replaceWithLockedInput = (pair, name, value, options) => {
    if (!pair) return null;
    const control = pair.querySelector('.journal-control');
    if (!control) return null;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.value = value || '';
    input.readOnly = true;
    input.disabled = true;
    input.className = 'journal-readonly';
    input.setAttribute('aria-readonly', 'true');
    input.setAttribute('aria-label', text(pair.querySelector('.journal-label')));
    if (options) optionMap.set(name, options);
    control.replaceChildren(input);
    return input;
  };
  const countryValue = (name, value, code) => {
    const list = optionMap.get(name) || [];
    const item = list.find(o => o.value === value || o.label === value || (code && o.code === code));
    if (item) return item.label;
    return value && code ? `${value} (${code})` : (value || '');
  };
  const productValue = value => {
    const list = optionMap.get('productGroup') || [];
    return list.find(o => o.value === value || o.label === value)?.label || value || '';
  };
  const businessNumber = (item, select) => {
    if (item?.businessNo) return item.businessNo;
    const options = JSON.parse(select?.dataset.options || '[]');
    const index = options.findIndex(option => option.value === item?.value || option.label === item?.label);
    return index < 0 ? '' : `123-45-${String(index + 1).padStart(5, '0')}`;
  };

  function apply(form) {
    if (!form || form.dataset.participantAutofillReady === 'true') return;
    const companySection = [...form.querySelectorAll('.journal-section')].find(section => text(section.querySelector('h2')).includes('기업 정보'));
    const buyerSection = [...form.querySelectorAll('.journal-section')].find(section => text(section.querySelector('h2')).includes('바이어정보'));
    if (!companySection || !buyerSection) return;
    form.dataset.participantAutofillReady = 'true';
    companySection.classList.add('participant-info-section');

    const pairs = [...companySection.querySelectorAll('.journal-pair')];
    const find = (label, inPairs = pairs) => inPairs.find(pair => text(pair.querySelector('.journal-label')).startsWith(label));
    const participant = find('셀러 (기업명)');
    const booth = find('부스 / 홀');
    const number = find('셀러 코드');
    const country = find('셀러 국가');
    const card = find('셀러 명함');
    const product = find('제품군');
    const contact = find('상담사 (기업 담당자)');
    const phone = find('상담사 연락처');
    const rows = [...companySection.querySelectorAll('.journal-table-row')];
    const table = companySection.querySelector('.journal-table');

    const countrySelect = country?.querySelector('[data-single-select]');
    const productSelect = product?.querySelector('[data-single-select]');
    let initialCountry = '';
    let initialProduct = '';
    if (countrySelect) {
      const opts = JSON.parse(countrySelect.dataset.options || '[]');
      optionMap.set('sellerCountry', opts);
      const value = countrySelect.querySelector('[data-select-value]')?.value;
      const code = countrySelect.querySelector(`[name="${countrySelect.querySelector('[data-select-value]')?.dataset.codeName}"]`)?.value;
      initialCountry = countryValue('sellerCountry', value, code);
    }
    if (productSelect) {
      const opts = JSON.parse(productSelect.dataset.options || '[]');
      optionMap.set('productGroup', opts);
      const value = productSelect.querySelector('[data-select-value]')?.value;
      initialProduct = productValue(value);
    }

    const companyInput = participant?.querySelector('[data-single-select]');
    const companyOptions = JSON.parse(companyInput?.dataset.options || '[]');
    const selectedCompanyValue = companyInput?.querySelector('[data-select-value]')?.value;
    const selectedCompany = companyOptions.find(item => item.value === selectedCompanyValue);
    const exhibitorScreen = (window.GFAIR_SCREENS || []).flatMap(group => group.screens || []).find(screen => screen.id === 'ENT-01');
    const boothByCompany = new Map((exhibitorScreen?.ui?.rows || []).map(row => [row[0], String(row[1] || '').replace(/^부스\s*/, '')]));
    companyOptions.forEach(item => {
      const boothNumber = boothByCompany.get(item.value);
      if (!boothNumber) return;
      item.boothNumber = boothNumber;
      item.label = `${item.value} / ${boothNumber}`;
      item.search = `${item.search || item.value} ${item.label} ${boothNumber}`;
    });
    if (companyInput) {
      companyInput.dataset.options = JSON.stringify(companyOptions);
      const selectedLabel = companyOptions.find(item => item.value === selectedCompanyValue)?.label;
      if (selectedLabel) companyInput.querySelector('[data-select-label]').textContent = selectedLabel;
      companyInput.querySelectorAll('.journal-select-option[data-select-value]').forEach(option => {
        const item = companyOptions.find(record => record.value === option.dataset.selectValue);
        if (!item) return;
        option.dataset.selectLabel = item.label;
        option.dataset.selectMeta = JSON.stringify(item);
        option.setAttribute('aria-label', item.label);
        const labelNode = [...option.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
        if (labelNode) labelNode.textContent = item.label;
        else option.append(document.createTextNode(item.label));
      });
    }
    if (participant) {
      participant.querySelector('.journal-label').innerHTML = '참가 기업<em> *</em>';
      participant.classList.remove('full');
    }
    replaceWithLockedInput(number, 'businessNo', businessNumber(selectedCompany, companyInput));
    if (number) number.querySelector('.journal-label').innerHTML = '사업자 번호<em> *</em>';
    replaceWithLockedInput(country, 'sellerCountry', initialCountry);
    replaceWithLockedInput(product, 'productGroup', initialProduct);
    [number, country, product, contact, phone].forEach(pair => {
      const input = pair?.querySelector('.journal-control input');
      if (input) { input.readOnly = true; input.disabled = true; input.classList.add('journal-readonly'); }
    });

    if (table) {
      const orderedRows = [
        [participant, number],
        [country, product],
        [contact, phone],
        [card]
      ];
      table.replaceChildren(...orderedRows.map(items => {
        const row = document.createElement('div');
        row.className = 'journal-table-row';
        if (items.includes(participant)) row.classList.add('participant-booth-row');
        if (items.includes(contact)) row.classList.add('advisor-contact-row');
        if (items.length === 1) items[0]?.classList.add('full');
        items.filter(Boolean).forEach(pair => row.append(pair));
        return row;
      }));
    }
    const upload = card?.querySelector('.journal-upload');
    if (upload) {
      manualCardState.set(form, {
        image: upload.querySelector('.imagepreview')?.cloneNode(true),
        name: upload.querySelector('.journal-card-name')?.cloneNode(true),
        value: upload.querySelector('[name="sellerCard"]')?.value || ''
      });
    }

    const buyerPairs = [...buyerSection.querySelectorAll('.journal-pair')];
    const buyerSelectPair = buyerPairs.find(pair => pair.querySelector('[data-single-select][data-name="buyer"]'));
    const buyerCode = buyerPairs.find(pair => text(pair.querySelector('.journal-label')).startsWith('바이어 코드'));
    const buyerCountry = buyerPairs.find(pair => text(pair.querySelector('.journal-label')).startsWith('바이어 국가'));
    const buyerCountrySelect = buyerCountry?.querySelector('[data-single-select]');
    const initialBuyerCountry = buyerCountrySelect?.querySelector('[data-select-label]')?.textContent || '';
    buyerCode?.remove();
    const buyerCountryOptions = JSON.parse(buyerCountrySelect?.dataset.options || '[]');
    optionMap.set('buyerCountry', buyerCountryOptions);
    replaceWithLockedInput(buyerCountry, 'buyerCountry', initialBuyerCountry, buyerCountryOptions);
    [buyerCountry].forEach(pair => {
      const input = pair?.querySelector('.journal-control input');
      if (input) { input.readOnly = true; input.disabled = true; input.classList.add('journal-readonly'); }
    });
    buyerSelectPair?.classList.remove('full');
    buyerCountry?.classList.remove('full');
    const buyerTable = buyerSection.querySelector('.journal-table');
    if (buyerTable) {
      const row = document.createElement('div');
      row.className = 'journal-table-row';
      row.append(buyerSelectPair);
      if (buyerCountry) row.append(buyerCountry);
      buyerTable.replaceChildren(row);
    }
    form.dataset.participantCompanySelect = companyInput?.dataset.name || 'company';
  }

  function selected(event) {
    const option = event.target.closest('[data-select-value][data-select-label]');
    if (!option || !formFor(option)) return;
    const form = formFor(option);
    const select = option.closest('[data-single-select]');
    const meta = JSON.parse(option.dataset.selectMeta || '{}');
    if (select?.dataset.name === 'company') {
      setLockedValue(form, 'businessNo', businessNumber(meta, select));
      setLockedValue(form, 'sellerCountry', countryValue('sellerCountry', meta.country, meta.countryCode));
      setLockedValue(form, 'productGroup', productValue(meta.productGroup));
      setLockedValue(form, 'contactPerson', meta.contactPerson || '');
      setLockedValue(form, 'contactPhone', meta.contactPhone || '');
      const upload = form.querySelector('.journal-upload'), state = manualCardState.get(form);
      if (upload && state) {
        upload.querySelectorAll('.imagepreview,.journal-card-name').forEach(node => node.remove());
        if (state.image) upload.insertBefore(state.image.cloneNode(true), upload.firstChild);
        if (state.name) upload.insertBefore(state.name.cloneNode(true), upload.firstChild);
        const file = upload.querySelector('#draft-image');
        if (file) file.required = !state.value;
        const savedCard = upload.querySelector('[name="sellerCard"]');
        if (savedCard) savedCard.value = state.value;
      }
    } else if (select?.dataset.name === 'buyer') {
      setLockedValue(form, 'buyerCode', meta.code || '');
      setLockedValue(form, 'buyerCountry', countryValue('buyerCountry', meta.country, meta.countryCode));
    }
  }
  function formFor(node) {
    const form = node.closest('#draft-form');
    return form?.dataset.participantAutofillReady === 'true' ? form : null;
  }

  app.addEventListener('click', selected);
  const observer = new MutationObserver(() => {
    const form = app.querySelector('#draft-form.export-journal-form');
    if (form) apply(form);
  });
  observer.observe(app, { childList: true, subtree: true });
  apply(app.querySelector('#draft-form.export-journal-form'));
})();
