package com.Crud.Teams.Controller;

import com.Crud.Teams.Model.Team;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/Teams")
@RestController
public class TeamController {
    private List<Team> Teams = new ArrayList<>();

    public TeamController() {
        Teams.addAll(List.of(
                new Team("Real Madrid", "Branco", "Espanha", "LaLiga", 40),
                new Team("Milan", "Vermelho e Preto", "Italia", "Serie A", 34),
                new Team("Liverpool", "Vermelho", "Inglaterra", "Premier League", 19),
                new Team("Bayern Munchen", "Vermelho e Branco", "Alemanha", "Bundesliga", 29)
        ));
    }

    @GetMapping
    public List<Team> getTeams() {
        return Teams;
    }

    @GetMapping("/names")
    public List<String> getTeamNames() {
        List<String> names = new ArrayList<>();
        for (Team c : Teams) {
            names.add(c.getName());
        }
        return names;
    }

    @GetMapping("/{name}")
    public ResponseEntity<Team> getTeamByName(@PathVariable String name) {
        for (Team c : Teams) {
            if (c.getName().equals(name)) {
                return new ResponseEntity<>(c, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<String> postTeam(@RequestBody Team value) {
        Teams.add(value);
        return new ResponseEntity<>("Team added successfully", HttpStatus.CREATED);
    }

    @PutMapping("/{name}")
    public ResponseEntity<String> putTeam(@PathVariable String name, @RequestBody Team time) {
        for (Team c : Teams) {
            if (c.getName().equals(name)) {
                Teams.set(Teams.indexOf(c), time);
                return new ResponseEntity<>("Team updated successfully", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Team not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteTeam(@PathVariable String name) {
        boolean removed = Teams.removeIf(c -> c.getName().equals(name));
        if (removed) {
            return new ResponseEntity<>("Team deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Team not found", HttpStatus.NOT_FOUND);
    }
}
