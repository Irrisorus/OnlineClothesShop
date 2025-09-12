
    const sizesContainer = document.getElementById('sizes-container');
    const addSizeButton = document.getElementById('add-size');
    const addImgButton=document.getElementById('add-img');
    const imgContainer = document.getElementById('img-container');


    function checkInput(ob) {
        let invalidChars = /[^0-9]/gi
        if(invalidChars.test(ob.value)) {
                  ob.value = ob.value.replace(invalidChars,"");
            }
      }

    function createSizeRow() {
        const rowCount = sizesContainer.children.length + 1;
        
        const row = document.createElement('div');
        row.className = 'size-row';
        row.innerHTML = `
            <div class="form-group">
                <label for="size-${rowCount}">Размер</label>
                <textarea type="text" id="size-${rowCount}" name="sizes[]" class="size" required></textarea>
            </div>
            <div class="form-group">
                <label for="quantity-${rowCount}">Количество</label>
                <textarea type="number" id="quantity-${rowCount}" name="quantities[]" min="0" class="size-amount" required> </textarea>
            </div>
            <button type="button" class="icon-button remove-size" title="Удалить размер">✕</button>
        `;
        
        return row;
    }
    
    function createImgRow() {
        const rowCount = imgContainer.children.length + 1;
        
        const row = document.createElement('div');
        row.className = 'img-row';
        row.innerHTML = `
           <div class="form-group">
                <label for="img-${rowCount}">Ссылка на фото</label>
                <textarea  id="photoUrl" name="photoUrl" required></textarea>
            </div>
        <button type="button" class="icon-button remove-img" title="Удалить размер">✕</button>
        `;
        
        return row;
    }

    addImgButton.addEventListener('click', () => {
        imgContainer.appendChild(createImgRow());
    });


    addSizeButton.addEventListener('click', () => {
        sizesContainer.appendChild(createSizeRow());
    });
    

    imgContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-img')) {
            const row = e.target.closest('.img-row');
            if (imgContainer.children.length > 1) {
                row.remove();
            }
        }
    });

    sizesContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-size')) {
            const row = e.target.closest('.size-row');
            if (sizesContainer.children.length > 1) {
                row.remove();
            }
        }
    });
