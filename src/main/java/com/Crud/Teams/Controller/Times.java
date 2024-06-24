public class Times {
    private String nome;
    private String cor;
    private String pais;
    private String campeonato;
    private int titulos;

    // Construtor para inicializar todos os atributos
    public Times(String nome, String cor, String pais, String campeonato, int titulos) {
        this.nome = nome;
        this.cor = cor;
        this.pais = pais;
        this.campeonato = campeonato;
        this.titulos = titulos;
    }

    // Getter e Setter para nome
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter e Setter para cor
    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    // Getter e Setter para pais
    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    // Getter e Setter para campeonato
    public String getCampeonato() {
        return campeonato;
    }

    public void setCampeonato(String campeonato) {
        this.campeonato = campeonato;
    }

    // Getter e Setter para titulos
    public int getTitulos() {
        return titulos;
    }

    public void setTitulos(int titulos) {
        this.titulos = titulos;
    }
}
