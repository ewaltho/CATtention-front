import React from 'react';
import '../assets/css/Community.css'

export default function Community() {
    return (
        <div>
            <p className="title">ADHD tips and hacks from the community</p>
            <img src="ideas.jpg" alt="idea cat" className="idea-cat"/>
            <div className="tips">
                <div className="tip">
                    Take advantage of tools! Keep a planner or scheduling app to track due dates, appointments, and to-do's. Reminders, reminders, reminders!
                </div>
                <div className="tip">
                    Take frequent breaks and eliminate any extra distractions. Physically change your work environment to avoid burnout and overstimulation.
                </div>
                <div className="tip">
                    The bionic reading plugin helps to encourage deeper, more in-depth reading and understanding using fixation points. This makes blocks of text seem less overwhelming and easier to comprehend.
                </div>
                <div className="tip">
                    Putting your cat in timeout so she doesnt unplug the router while you're trying to work.
                </div>
                <div className="tip">
                    Write reminders where you'll see them frequently. For example, writing them on the bathroom mirror with expo marker.
                </div>
                <div className="tip">
                    Reorganize your fridge/pantry to have food with short use dates more visible than ones that last a long time (condiments in the drawers, raw meat right up front). Having fresh food and snacks available will help you stay focused and energized.
                </div>
                <div className="tip">
                    Use noise cancelling headphones to eliminate distracting, loud sounds.
                </div>
                <div className="tip">
                    Your brain can focus and learn better after exercise. Cardio is best, but even a short walk can help!
                </div>
                <div className="tip">
                    Keep a list of "Things Done", too! Remind yourself that even if you still have things on your to-do list, you did make accomplishments today.
                </div>
                <div className="tip">
                    Create a reward system for yourself. A snack, a break, or some time on your favorite app. Celebrate what you've achieved!
                </div>
            </div>
        </div>
    );
}