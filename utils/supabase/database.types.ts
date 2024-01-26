export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      game_orders: {
        Row: {
          created_at: string
          game: number
          id: number
          orderer_username: string
        }
        Insert: {
          created_at?: string
          game: number
          id?: number
          orderer_username: string
        }
        Update: {
          created_at?: string
          game?: number
          id?: number
          orderer_username?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_orders_game_fkey"
            columns: ["game"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          created_at: string
          id: number
          motivation: string
          name: string
          status: string
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          motivation: string
          name: string
          status: string
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          motivation?: string
          name?: string
          status?: string
          url?: string | null
        }
        Relationships: []
      }
      movie_orders: {
        Row: {
          created_at: string
          id: number
          movie: number
          orderer_username: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          movie: number
          orderer_username?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          movie?: number
          orderer_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movie_orders_movie_fkey"
            columns: ["movie"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          }
        ]
      }
      movies: {
        Row: {
          created_at: string
          id: number
          name: string | null
          release_year: number | null
          status: string
          url: string | null
          watched_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          release_year?: number | null
          status?: string
          url?: string | null
          watched_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          release_year?: number | null
          status?: string
          url?: string | null
          watched_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
