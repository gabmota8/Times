package com.Crud.Teams.Model;

public class Team {
    public String name;
    public String colors;
    public String country;
    public String championship;
    public int title;

    public Team(String name, String colors, String country, String championship, int title) {
        this.name = name;
        this.colors = colors;
        this.country= country;
        this.championship = championship ;
        this.title =title ;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColors() {
        return colors;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getChampionship() {
        return championship;
    }

    public void setChampionship(String championship) {
        this.championship = championship;
    }

    public int getTitle() {
        return title;
    }

    public void setTitle(int title) {
        this.title = title;
    }
}
