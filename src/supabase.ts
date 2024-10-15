export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      auth: {
        Row: {
          user_email: string | null
          user_id: string
          user_point: number | null
          user_pw: string | null
          user_type: string | null
          user_uuid: number
        }
        Insert: {
          user_email?: string | null
          user_id: string
          user_point?: number | null
          user_pw?: string | null
          user_type?: string | null
          user_uuid?: number
        }
        Update: {
          user_email?: string | null
          user_id?: string
          user_point?: number | null
          user_pw?: string | null
          user_type?: string | null
          user_uuid?: number
        }
        Relationships: []
      }
      post_detail: {
        Row: {
          experience: number | null
          isadopted: boolean | null
          post_id: string
          post_title: string | null
          region: string[] | null
          use_point: number | null
          user_uuid: string
        }
        Insert: {
          experience?: number | null
          isadopted?: boolean | null
          post_id?: string
          post_title?: string | null
          region?: string[] | null
          use_point?: number | null
          user_uuid: string
        }
        Update: {
          experience?: number | null
          isadopted?: boolean | null
          post_id?: string
          post_title?: string | null
          region?: string[] | null
          use_point?: number | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_detail_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_detail_education: {
        Row: {
          edu_id: string
          graduated_at: string | null
          major: string | null
          post_id: string
          school_name: string | null
          user_uuid: string
        }
        Insert: {
          edu_id?: string
          graduated_at?: string | null
          major?: string | null
          post_id: string
          school_name?: string | null
          user_uuid: string
        }
        Update: {
          edu_id?: string
          graduated_at?: string | null
          major?: string | null
          post_id?: string
          school_name?: string | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_detail_education_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_detail_education_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_detail_experience: {
        Row: {
          exp_desc: string | null
          exp_id: string
          exp_period: string | null
          exp_position: string | null
          exp_region: string | null
          post_id: string
          user_uuid: string
        }
        Insert: {
          exp_desc?: string | null
          exp_id?: string
          exp_period?: string | null
          exp_position?: string | null
          exp_region?: string | null
          post_id: string
          user_uuid: string
        }
        Update: {
          exp_desc?: string | null
          exp_id?: string
          exp_period?: string | null
          exp_position?: string | null
          exp_region?: string | null
          post_id?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_detail_experience_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_detail_experience_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_detail_license: {
        Row: {
          lic_agency: string | null
          lic_date: string | null
          lic_id: string
          lic_title: string | null
          post_id: string
          user_uuid: string
        }
        Insert: {
          lic_agency?: string | null
          lic_date?: string | null
          lic_id?: string
          lic_title?: string | null
          post_id: string
          user_uuid: string
        }
        Update: {
          lic_agency?: string | null
          lic_date?: string | null
          lic_id?: string
          lic_title?: string | null
          post_id?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_detail_license_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_detail_license_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_feedback: {
        Row: {
          feedback_desc: string | null
          feedback_id: string
          feedback_isSelected: boolean | null
          post_id: string
          user_uuid: string
        }
        Insert: {
          feedback_desc?: string | null
          feedback_id?: string
          feedback_isSelected?: boolean | null
          post_id: string
          user_uuid: string
        }
        Update: {
          feedback_desc?: string | null
          feedback_id?: string
          feedback_isSelected?: boolean | null
          post_id?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_feedback_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_feedback_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          question_answer: string | null
          question_id: string
          question_text: string
        }
        Insert: {
          question_answer?: string | null
          question_id?: string
          question_text: string
        }
        Update: {
          question_answer?: string | null
          question_id?: string
          question_text?: string
        }
        Relationships: []
      }
      response: {
        Row: {
          is_correct: boolean | null
          questions_id: string
          response_id: string
          user_answer: string | null
          user_uuid: string
        }
        Insert: {
          is_correct?: boolean | null
          questions_id?: string
          response_id?: string
          user_answer?: string | null
          user_uuid?: string
        }
        Update: {
          is_correct?: boolean | null
          questions_id?: string
          response_id?: string
          user_answer?: string | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "response_questions_id_fkey"
            columns: ["questions_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["question_id"]
          },
        ]
      }
      result: {
        Row: {
          correct_answer: number | null
          result_id: string
          total_question: number | null
          user_uuid: string
        }
        Insert: {
          correct_answer?: number | null
          result_id?: string
          total_question?: number | null
          user_uuid?: string
        }
        Update: {
          correct_answer?: number | null
          result_id?: string
          total_question?: number | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "result_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
