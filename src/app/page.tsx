'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAppStore, type Module, type Test, type Question } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BookOpen, Trophy, Target, Timer, Star, Zap, Award, 
  Users, LogOut, Play, ChevronRight, Home, BarChart3,
  Medal, Crown, Flame, CheckCircle, XCircle, Clock,
  Sparkles, TrendingUp
} from 'lucide-react'

// ============ LOGIN VIEW ============
function LoginView() {
  const { setUser, setView, setIsLoading, setError, error } = useAppStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Chyba při přihlášení')
        return
      }
      
      setUser(data.user)
    } catch {
      setError('Chyba při přihlášení')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Školní Trénink
          </CardTitle>
          <CardDescription>Učení hrou pro děti</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Přihlásit se
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Nemáš účet?{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => setView('register')}>
                Zaregistruj se
              </Button>
            </p>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-center text-muted-foreground">
            <p>Demo účet: demo@skolka.cz / demo123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============ REGISTER VIEW ============
function RegisterView() {
  const { setUser, setView, setIsLoading, setError, error } = useAppStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [classes, setClasses] = useState<{id: string, grade: number, name: string}[]>([])

  useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => setClasses(data.classes || []))
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Hesla se neshodují')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, schoolClassId: selectedClass || null })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Chyba při registraci')
        return
      }
      
      setUser(data.user)
    } catch {
      setError('Chyba při registraci')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Registrace</CardTitle>
          <CardDescription>Vytvoř si svůj účet</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Jméno</Label>
              <Input
                id="name"
                placeholder="Tvoje jméno"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Heslo</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Potvrdit heslo</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Třída (volitelné)</Label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">Vyber třídu...</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Zaregistrovat se
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Už máš účet?{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => setView('login')}>
                Přihlas se
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============ DASHBOARD VIEW ============
function DashboardView() {
  const { user, setView, setSelectedModule, reset } = useAppStore()
  const [modules, setModules] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grade = user?.schoolClass?.grade
        const url = grade ? `/api/modules?grade=${grade}` : '/api/modules'
        const res = await fetch(url)
        const data = await res.json()
        setModules(data.modules || [])
      } catch (error) {
        console.error('Error fetching modules:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    if (user) {
      fetchData()
    }
  }, [user])

  const handleLogout = () => {
    reset()
  }

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module)
    setView('module')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Lehké'
      case 'medium': return 'Střední'
      case 'hard': return 'Těžké'
      default: return difficulty
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Školní Trénink</h1>
                <p className="text-xs text-muted-foreground">{user?.schoolClass?.name || 'Bez třídy'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setView('leaderboard')}>
                <Trophy className="w-4 h-4 mr-1" />
                Žebříček
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setView('achievements')}>
                <Award className="w-4 h-4 mr-1" />
                Úspěchy
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                    {user?.name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Úroveň {user?.level}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700">{user?.totalPoints || 0}</p>
                  <p className="text-xs text-muted-foreground">Bodů</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700">{user?.level || 1}</p>
                  <p className="text-xs text-muted-foreground">Úroveň</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700">{user?.currentStreak || 0}</p>
                  <p className="text-xs text-muted-foreground">Denní série</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Medal className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">{user?.bestStreak || 0}</p>
                  <p className="text-xs text-muted-foreground">Nejlepší série</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Vzdělávací moduly</h2>
          {user?.schoolClass && (
            <Badge variant="outline" className="bg-white">
              Pro {user.schoolClass.name}
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : modules.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Pro tvou třídu zatím nejsou dostupné žádné moduly.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map(module => (
              <Card 
                key={module.id} 
                className="border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleModuleClick(module)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {module.icon || '📚'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-emerald-600 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                          {getDifficultyText(module.difficulty)}
                        </Badge>
                        {module.estimatedTime && (
                          <Badge variant="outline" className="bg-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {module.estimatedTime} min
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-white">
                          <Target className="w-3 h-3 mr-1" />
                          {module._count.tests} testů
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Školní Trénink - Učení hrou pro české děti
        </div>
      </footer>
    </div>
  )
}

// ============ MODULE VIEW ============
function ModuleView() {
  const { selectedModule, setView, setSelectedTest, user } = useAppStore()
  const [tests, setTests] = useState<Test[]>([])

  useEffect(() => {
    if (selectedModule) {
      setTests(selectedModule.tests || [])
    }
  }, [selectedModule])

  if (!selectedModule) {
    return null
  }

  const handleTestClick = (test: Test) => {
    setSelectedTest(test)
    setView('test')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'practice': return <Target className="w-5 h-5" />
      case 'challenge': return <Zap className="w-5 h-5" />
      case 'multiplayer': return <Users className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'practice': return 'Procvičování'
      case 'challenge': return 'Výzva'
      case 'multiplayer': return 'Multiplayer'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'practice': return 'from-emerald-500 to-teal-600'
      case 'challenge': return 'from-orange-500 to-red-600'
      case 'multiplayer': return 'from-purple-500 to-pink-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setView('dashboard')}>
                <Home className="w-4 h-4 mr-1" />
                Zpět
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                  {user?.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Module Header */}
        <Card className="border-0 shadow-lg mb-6 overflow-hidden">
          <div className={`bg-gradient-to-r ${selectedModule.difficulty === 'easy' ? 'from-emerald-500 to-teal-600' : selectedModule.difficulty === 'medium' ? 'from-orange-500 to-amber-600' : 'from-red-500 to-pink-600'} p-6`}>
            <div className="flex items-center gap-4 text-white">
              <div className="text-5xl">{selectedModule.icon || '📚'}</div>
              <div>
                <h1 className="text-2xl font-bold">{selectedModule.title}</h1>
                <p className="opacity-90">{selectedModule.description}</p>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedModule.estimatedTime} min
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                {selectedModule._count.tests} testů
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {selectedModule.category}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tests */}
        <h2 className="text-xl font-bold mb-4">Dostupné testy</h2>
        <div className="grid gap-4">
          {tests.map(test => (
            <Card 
              key={test.id} 
              className="border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleTestClick(test)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(test.type)} flex items-center justify-center text-white`}>
                      {getTypeIcon(test.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-emerald-600 transition-colors">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{getTypeText(test.type)}</span>
                        {test.timeLimit && (
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {Math.floor(test.timeLimit / 60)}:{(test.timeLimit % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                        <span>{test.questionsCount} otázek</span>
                        <span>{test.pointsPerQuestion} bodů/otázka</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    <Play className="w-4 h-4 mr-2" />
                    Spustit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Školní Trénink - Učení hrou pro české děti
        </div>
      </footer>
    </div>
  )
}

// ============ TEST VIEW ============
function TestView() {
  const { 
    selectedModule, selectedTest, user,
    currentQuestions, setCurrentQuestions,
    currentAnswers, setCurrentAnswer,
    testStartTime, setTestStartTime,
    setView, setTestResult, setSelectedTest
  } = useAppStore()
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // Generate questions on mount
  useEffect(() => {
    const generateQuestions = async () => {
      if (selectedModule && selectedTest) {
        try {
          const res = await fetch('/api/tests/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              moduleId: selectedModule.id,
              testId: selectedTest.id,
              count: selectedTest.questionsCount
            })
          })
          const data = await res.json()
          setCurrentQuestions(data.questions)
          setTestStartTime(Date.now())
          if (selectedTest.timeLimit) {
            setTimeLeft(selectedTest.timeLimit)
          }
        } catch (error) {
          console.error('Error generating questions:', error)
        }
      }
    }
    
    generateQuestions()
  }, [selectedModule, selectedTest, setCurrentQuestions, setTestStartTime])

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
    if (currentQuestions[currentQuestion]) {
      setCurrentAnswer(currentQuestions[currentQuestion].id, answer)
    }
  }

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedAnswer(null)
    }
  }

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || !user || !selectedTest || !testStartTime) return
    
    setIsSubmitting(true)
    
    // Calculate results
    let correct = 0
    currentQuestions.forEach(q => {
      if (currentAnswers[q.id] === q.answer) {
        correct++
      }
    })
    
    const timeSpent = Math.floor((Date.now() - testStartTime) / 1000)
    const points = correct * (selectedTest.pointsPerQuestion || 10)
    
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          testId: selectedTest.id,
          score: correct,
          totalQuestions: currentQuestions.length,
          points,
          timeSpent,
          answers: currentAnswers
        })
      })
      
      const data = await res.json()
      
      setTestResult({
        id: data.result.id,
        score: correct,
        totalQuestions: currentQuestions.length,
        points,
        timeSpent,
        createdAt: new Date().toISOString()
      })
      
      setView('results')
    } catch (error) {
      console.error('Error submitting test:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, user, selectedTest, testStartTime, currentQuestions, currentAnswers, setTestResult, setView])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!selectedModule || !selectedTest || currentQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Generování otázek...</p>
        </div>
      </div>
    )
  }

  const question = currentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">{selectedTest.title}</h1>
              <p className="text-sm text-muted-foreground">{selectedModule.title}</p>
            </div>
            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${timeLeft <= 30 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  <Timer className="w-4 h-4" />
                  <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={() => {
                setSelectedTest(null)
                setView('module')
              }}>
                Zrušit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white/50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>Otázka {currentQuestion + 1} z {currentQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Question */}
            <div className="text-center mb-8">
              <p className="text-3xl font-bold mb-2">{question.question}</p>
            </div>

            {/* Options */}
            {question.options && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    className={`h-16 text-xl font-semibold transition-all ${
                      selectedAnswer === option 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' 
                        : 'hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Předchozí
              </Button>
              <div className="flex gap-1">
                {currentQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentQuestion 
                        ? 'bg-emerald-500' 
                        : currentAnswers[currentQuestions[index].id] 
                          ? 'bg-emerald-200' 
                          : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              {currentQuestion === currentQuestions.length - 1 ? (
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Ukládání...' : 'Dokončit'}
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  onClick={handleNext}
                >
                  Další
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// ============ RESULTS VIEW ============
function ResultsView() {
  const { testResult, selectedTest, user, setView, setSelectedTest } = useAppStore()
  
  if (!testResult || !selectedTest) {
    return null
  }

  const percentage = Math.round((testResult.score / testResult.totalQuestions) * 100)
  
  const getGrade = () => {
    if (percentage >= 90) return { text: 'Výborně!', emoji: '🏆', color: 'text-amber-500' }
    if (percentage >= 70) return { text: 'Chvályhodně!', emoji: '⭐', color: 'text-emerald-500' }
    if (percentage >= 50) return { text: 'Dobře!', emoji: '👍', color: 'text-blue-500' }
    return { text: 'Zkus to znovu!', emoji: '💪', color: 'text-orange-500' }
  }

  const grade = getGrade()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 text-center">
        <CardHeader className="pb-2">
          <div className="text-6xl mb-4">{grade.emoji}</div>
          <CardTitle className={`text-3xl font-bold ${grade.color}`}>{grade.text}</CardTitle>
          <CardDescription>{selectedTest.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${percentage * 3.52} 352`}
                className="text-emerald-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <CheckCircle className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <p className="text-2xl font-bold">{testResult.score}</p>
              <p className="text-xs text-muted-foreground">Správně</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <XCircle className="w-5 h-5 mx-auto text-red-500 mb-1" />
              <p className="text-2xl font-bold">{testResult.totalQuestions - testResult.score}</p>
              <p className="text-xs text-muted-foreground">Špatně</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <Star className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <p className="text-2xl font-bold">+{testResult.points}</p>
              <p className="text-xs text-muted-foreground">Bodů</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(testResult.timeSpent / 60)}:{(testResult.timeSpent % 60).toString().padStart(2, '0')}</span>
          </div>

          {/* Level Up Check */}
          {user && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-700">Celkem {user.totalPoints + testResult.points} bodů</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setSelectedTest(null)
                setView('dashboard')
              }}
            >
              <Home className="w-4 h-4 mr-2" />
              Domů
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              onClick={() => setView('test')}
            >
              <Play className="w-4 h-4 mr-2" />
              Znovu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============ ACHIEVEMENTS VIEW ============
function AchievementsView() {
  const { user, setView } = useAppStore()
  const [achievements, setAchievements] = useState<{id: string, slug: string, title: string, description: string, icon: string, points: number, earned?: boolean}[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch('/api/achievements')
        const data = await res.json()
        setAchievements(data.achievements || [])
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAchievements()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setView('dashboard')}>
                <Home className="w-4 h-4 mr-1" />
                Zpět
              </Button>
            </div>
            <h1 className="font-bold text-lg">Úspěchy</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Načítání úspěchů...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <Card 
                key={achievement.id} 
                className={`border-0 shadow-md ${achievement.earned ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : 'opacity-60'}`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-5xl mb-3 ${!achievement.earned && 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <Badge variant="outline" className="bg-white">
                    <Star className="w-3 h-3 mr-1 text-amber-500" />
                    {achievement.points} bodů
                  </Badge>
                  {achievement.earned && (
                    <div className="mt-3">
                      <Badge className="bg-emerald-500">Získáno!</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Školní Trénink - Učení hrou pro české děti
        </div>
      </footer>
    </div>
  )
}

// ============ LEADERBOARD VIEW ============
function LeaderboardView() {
  const { setView } = useAppStore()
  const [leaderboard, setLeaderboard] = useState<{id: string, name: string, totalPoints: number, level: number, schoolClass: {name: string, grade: number} | null}[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard')
        const data = await res.json()
        setLeaderboard(data.leaderboard || [])
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchLeaderboard()
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-amber-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-amber-700" />
      default: return <span className="text-lg font-bold text-muted-foreground">{rank}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setView('dashboard')}>
                <Home className="w-4 h-4 mr-1" />
                Zpět
              </Button>
            </div>
            <h1 className="font-bold text-lg">Žebříček</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Načítání žebříčku...</p>
          </div>
        ) : (
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-white text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Nejlepší hráči</h2>
            </div>
            <ScrollArea className="max-h-96">
              <div className="divide-y">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className={`flex items-center gap-4 p-4 ${index < 3 ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        {entry.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{entry.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Úroveň {entry.level} • {entry.schoolClass?.name || 'Bez třídy'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">{entry.totalPoints}</p>
                      <p className="text-xs text-muted-foreground">bodů</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Školní Trénink - Učení hrou pro české děti
        </div>
      </footer>
    </div>
  )
}

// ============ MAIN APP ============
export default function Home() {
  const { currentView, isLoggedIn } = useAppStore()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          useAppStore.getState().setUser(data.user)
        }
      } catch {
        // Not logged in
      }
    }
    
    if (!isLoggedIn) {
      checkAuth()
    }
  }, [isLoggedIn])

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView />
      case 'register':
        return <RegisterView />
      case 'dashboard':
        return <DashboardView />
      case 'module':
        return <ModuleView />
      case 'test':
        return <TestView />
      case 'results':
        return <ResultsView />
      case 'achievements':
        return <AchievementsView />
      case 'leaderboard':
        return <LeaderboardView />
      default:
        return <LoginView />
    }
  }

  return renderView()
}
