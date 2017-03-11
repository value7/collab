import React from 'react'

export default React.createClass({
  render() {
    return <div>
    <br></br><br></br>
    <h1>the four Phases of a Project</h1>
    <h2>Draft | Planning | Execution | Completed</h2>
    <br></br>
    <p>
    Projects in <b>Draft</b> exist in order to find Participants.
    They dont need to be thouroghly thought through and only consist of
    a Title and a Description (optional Image).
    </p>
    <p>
    When the creator of a Project is happy with the interest and amount
    of Participants the Project can be moved to the next Phase.
    </p>
    <p>
    In the <b>Planning</b> Phase Issues are added to the Project. Issues should be small
    enough that a single Member can take care of it, however you can decide how small or
    big these are.
    </p>
    <p>
    When you think you have created every Issue that is needed and every Issue
    has an owner the Project should be moved to the next Phase.
    </p>
    <p>
    The <b>Executing</b> Phase is a Kanban board where you can follow the Progress of the
    Project. If a Member has a Problem with an Issue they can open a Bug.
    </p>
    <p>
    When every Task is done and the Project is finished its time to move the Project to
    the final Phase
    </p>
    <p>
    The <b>Completed</b> Phase is a place to show off and discuss any Problems you have
    run into.
    </p>
    </div>
  }
})
