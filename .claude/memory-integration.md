# Memory System Integration Guide

## 🧠 MCP Memory Integration for mermaidkaz

### Overview
The mermaidkaz genie system leverages MCP memory for persistent knowledge sharing across agents and sessions.

### Core Memory Entities

#### Project Knowledge Graph
```
Entities:
- mermaidkaz_project (type: project)
- tech_stack (type: technology)
- agent_network (type: system)
- user_preferences (type: configuration)
- learned_patterns (type: knowledge)
```

#### Key Relationships
```
- mermaidkaz_project -> uses -> tech_stack
- agent_network -> coordinates -> mermaidkaz_project
- learned_patterns -> improves -> agent_network
- user_preferences -> guides -> mermaidkaz_project
```

### Agent Memory Protocol

#### 1. Before Task Execution
```javascript
// Search for relevant context
search_nodes("mermaidkaz")
search_nodes("[specific_topic]")

// Load project-specific knowledge
open_nodes(["mermaidkaz_project", "tech_stack", "learned_patterns"])
```

#### 2. During Task Execution
```javascript
// Track new discoveries
create_entities([{
  name: "discovery_[timestamp]",
  entityType: "insight",
  observations: ["What was learned", "How it applies"]
}])

// Link to project
create_relations([{
  from: "discovery_[timestamp]",
  relationType: "enhances",
  to: "mermaidkaz_project"
}])
```

#### 3. After Task Completion
```javascript
// Store outcomes
add_observations([{
  entityName: "mermaidkaz_project",
  contents: ["Task completed: [description]", "Result: [outcome]"]
}])

// Update patterns
add_observations([{
  entityName: "learned_patterns",
  contents: ["Pattern: [what_worked]", "Anti-pattern: [what_didn't]"]
}])
```

### Cross-Agent Knowledge Sharing

#### Agent Handoff Protocol
When one agent hands off to another:
1. Store context in memory
2. Create handoff entity with observations
3. Next agent retrieves handoff context
4. Continue with shared knowledge

#### Collective Learning
- Each agent contributes observations
- Patterns emerge from multiple interactions
- System evolves based on collective experience

### Memory Search Strategies

#### Effective Searches
```
✅ search_nodes("performance") - Single keywords
✅ search_nodes("authentication") - Concepts
✅ search_nodes("error") - Issues
```

#### Ineffective Searches
```
❌ search_nodes("performance optimization") - Too specific
❌ search_nodes("how to") - Too generic
```

### Best Practices

1. **Always Check Memory First**: Before any major task
2. **Store Valuable Insights**: After completing tasks
3. **Link Related Concepts**: Build knowledge connections
4. **Prune Outdated Info**: Keep memory relevant
5. **Share Across Agents**: Enable collective intelligence

### Memory Maintenance

#### Regular Cleanup
- Remove obsolete observations
- Update outdated relationships
- Consolidate duplicate entities

#### Knowledge Evolution
- Refine patterns based on new data
- Upgrade agent capabilities
- Document system improvements

### Integration with Genie System

The memory system acts as the genie's "magical knowledge vault":
- **Persistence**: Knowledge survives across sessions
- **Evolution**: System gets smarter over time
- **Coordination**: Agents share intelligence
- **Adaptation**: Learns user preferences

**Every wish granted makes the genie wiser!** 🧞🧠✨