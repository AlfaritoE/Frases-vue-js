const { createApp, ref, computed } = Vue;

const app = createApp({
    setup() {

        const FrasesFinales = ref([
            { frase: "La vida es lo que sucede mientras estás ocupado haciendo otros planes.", autor: "John Lennon" },
            { frase: "El único modo de hacer un gran trabajo es amar lo que haces.", autor: "Steve Jobs" },
            { frase: "En medio de la dificultad reside la oportunidad.", autor: "Albert Einstein" }
        ]);

        const NFrase = ref('');
        const NAutor = ref('');

        const contador = computed(() => FrasesFinales.value.length);

        const editando = ref(false);
        const editIndex = ref(null);
        const editFrase = ref('');
        const editAutor = ref('');

        const agregar = () => {
            
            if (NFrase.value && NAutor.value) {
                
                FrasesFinales.value.push({
                    frase: NFrase.value,
                    autor: NAutor.value
                });
                alertify.success('Agregado correctamente')


                NFrase.value = "";
                NAutor.value = "";
            }else {
                alertify.confirm(
                    'Campos incompletos',
                    'Por favor, complete todos los campos antes de agregar.',
                    function() {
                        
                        alertify.error('Debe completar los campos.');
                    }
                );
            }

        }
 
        const eliminar = (num) => {
            alertify.confirm('Eliminar Frase' , '¿Estás seguro de que deseas eliminar esta frase?',
                function() {
                  FrasesFinales.value.splice(num, 1);
                  alertify.success('Frase eliminada');
                },
                function() {
                  alertify.error('Cancelar');
                }
              );
        };

        const editar = (index) => {
            editando.value = true;
            editIndex.value = index;
            editFrase.value = FrasesFinales.value[index].frase;
            editAutor.value = FrasesFinales.value[index].autor; 
            
        };

        const guardar = () => {
            if (editIndex.value !== null) {
                FrasesFinales.value[editIndex.value].frase = editFrase.value;
                FrasesFinales.value[editIndex.value].autor = editAutor.value;
                cancelar();
            }
        };

        const cancelar = () => {
            editando.value = false;
            editIndex.value = null;
            editFrase.value = '';
            editAutor.value = '';
        };


        return {
            FrasesFinales,
            agregar,
            NAutor,
            NFrase,
            contador,
            eliminar,
            editar,
            editFrase,
            editAutor,
            editando,
            guardar,
            cancelar
        };
    }
}).mount('#app')