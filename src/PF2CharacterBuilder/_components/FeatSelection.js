import React, { useState, useEffect } from "react";
import _ from "lodash";
import FEATS from "../../_data/feats/allFeats.json";

const FeatSelection = (props) => {
  const [query, setQuery] = useState("");
  const [feats, setFeats] = useState(
    FEATS.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 1;
    })
  );

  useEffect(() => {
    let filteredFeats = _.cloneDeep(FEATS);
    let [type, level] = props.featKey.split("_");

    if (type === "ancestry") {
      filteredFeats = filteredFeats.filter((feat) => {
        return (
          feat.traits.includes(props.character.ancestry.name) &&
          parseInt(feat.level, 10) <= parseInt(level, 10)
        );
      });
    }

    if (type === "class") {
      filteredFeats = filteredFeats.filter((feat) => {
        let isCorrectClass = feat.traits.includes(
          props.character.class.name
        );
        let isCorrectLevel =
          parseInt(feat.level, 10) <= parseInt(level, 10);
        return isCorrectClass && isCorrectLevel;
      });
    }

    if (type === "skill") {
      filteredFeats = filteredFeats.filter((feat) => {
        return (
          feat.traits.includes("Skill") &&
          parseInt(feat.level, 10) <= parseInt(level, 10)
        );
      });
    }

    if (type === "misc") {
      filteredFeats = filteredFeats.filter((feat) => {
        return feat.traits.includes("General");
      });
    }

    filteredFeats = filteredFeats.filter((feat) => {
      for (const trait of feat.traits) {
        if (trait.toLowerCase().includes(query.toLowerCase())) return true;
      }
      return feat.name.toLowerCase().includes(query.toLowerCase());
    });

    setFeats(
      filteredFeats.sort((a, b) =>
        Number(a.level) < Number(b.level) ? -1 : 1
      )
    );
  }, [
    query,
    props.character.ancestry.name,
    props.character.class.name,
    props.featKey,
  ]);

  return (
    <div style={{ position: "relative" }}>
      <label
        className=""
        style={{
          position: "fixed",
          display: "block",
          right: "8rem",
          zIndex: "999",
          marginTop: "-3rem",
        }}
      >
        Search by Name or Trait:{" "}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <table className="c-feat-selection">
        <thead>
          <tr className="c-feat-selection__row">
            <th style={{ flex: "1" }}></th>
            <th style={{ flex: "2" }}>Name</th>
            <th style={{ flex: "1", textAlign: "center" }}>Level</th>
            <th style={{ flex: "1" }}>Traits</th>
            <th style={{ flex: "10" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {feats.map((feat) => {
            return (
              <tr className="c-feat-selection__row" key={feat.name}>
                <td style={{ flex: "1", textAlign: "center" }}>
                  <button
                    onClick={() => props.selectFeat(feat)}
                    className="pf-button"
                  >
                    <i className="fas fa-plus fa"></i>
                  </button>
                </td>
                <td style={{ flex: "2" }}>{feat.name}</td>
                <td style={{ flex: "1", textAlign: "center" }}>
                  {feat.level}
                </td>
                <td style={{ flex: "1" }}>{feat.traits.join(", ")}</td>
                <td style={{ flex: "10" }}>
                  <p>
                    <b>Prerequisites:</b> {feat.prerequisites}
                  </p>

                  <p dangerouslySetInnerHTML={{ __html: feat.desc }}></p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FeatSelection;
